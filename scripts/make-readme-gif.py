from pathlib import Path
import os
import shutil
import subprocess


ROOT = Path("docs/media")
INPUT = ROOT / "moriah-walkthrough.webm"
OUTPUT = ROOT / "moriah-walkthrough.gif"
PALETTE = ROOT / ".moriah-walkthrough-palette.png"

WIDTH = int(os.environ.get("README_GIF_WIDTH", "720"))
FPS = int(os.environ.get("README_GIF_FPS", "15"))


def find_ffmpeg() -> str:
    candidates: list[str] = []

    env_path = os.environ.get("README_FFMPEG_PATH")
    if env_path and Path(env_path).exists():
        candidates.append(env_path)

    system_ffmpeg = shutil.which("ffmpeg")
    if system_ffmpeg:
        candidates.append(system_ffmpeg)

    local_app_data = os.environ.get("LOCALAPPDATA")
    if local_app_data:
        candidates.extend(str(path) for path in sorted(Path(local_app_data).glob("ms-playwright/ffmpeg-*/ffmpeg-win64.exe")))

    for candidate in candidates:
        if supports_gif_filters(candidate):
            return candidate

    raise SystemExit("A full ffmpeg build with fps/palettegen/paletteuse filters was not found. Set README_FFMPEG_PATH or install ffmpeg.")


def supports_gif_filters(ffmpeg: str) -> bool:
    try:
        result = subprocess.run(
            [ffmpeg, "-hide_banner", "-filters"],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return False

    filters = result.stdout
    return all(name in filters for name in ("fps", "palettegen", "paletteuse"))


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def main() -> None:
    if not INPUT.exists():
        raise SystemExit(f"Missing input video: {INPUT}")

    ffmpeg = find_ffmpeg()
    scale_filter = f"fps={FPS},scale={WIDTH}:-1:flags=lanczos"

    run(
        [
            ffmpeg,
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(INPUT),
            "-vf",
            f"{scale_filter},palettegen=stats_mode=diff",
            "-frames:v",
            "1",
            "-update",
            "1",
            str(PALETTE),
        ],
    )
    run(
        [
            ffmpeg,
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(INPUT),
            "-i",
            str(PALETTE),
            "-lavfi",
            f"{scale_filter} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=4",
            str(OUTPUT),
        ],
    )

    PALETTE.unlink(missing_ok=True)
    print(f"{OUTPUT} {OUTPUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
