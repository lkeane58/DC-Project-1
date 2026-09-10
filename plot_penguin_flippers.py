"""Plot penguin flipper length against body mass, grouped by island.

Run from this directory (or any directory):
    python3 plot_penguin_flippers.py

The script writes ``penguin_flipper_length_by_body_mass.png`` beside this file.
"""

from pathlib import Path
import csv

import matplotlib.pyplot as plt
import numpy as np


PROJECT_DIR = Path(__file__).resolve().parent
INPUT_FILE = PROJECT_DIR / "penguins.csv"
OUTPUT_FILE = PROJECT_DIR / "penguin_flipper_length_by_body_mass.png"

# A readable, colour-blind-friendly set of colours for the island categories.
ISLAND_COLORS = {
    "Biscoe": "#0072B2",
    "Dream": "#D55E00",
    "Torgersen": "#009E73",
}


def load_penguin_measurements(csv_path: Path) -> dict[str, tuple[list[float], list[float]]]:
    """Return valid (body mass, flipper length) values grouped by island."""
    measurements: dict[str, tuple[list[float], list[float]]] = {}
    with csv_path.open(newline="", encoding="utf-8") as csv_file:
        for row in csv.DictReader(csv_file):
            try:
                island = row["island"].strip()
                body_mass = float(row["body_mass_g"])
                flipper_length = float(row["flipper_length_mm"])
            except (KeyError, TypeError, ValueError):
                # Skip incomplete rows; a trend line needs both measurements.
                continue

            masses, flippers = measurements.setdefault(island, ([], []))
            masses.append(body_mass)
            flippers.append(flipper_length)
    return measurements


def main() -> None:
    data = load_penguin_measurements(INPUT_FILE)
    if not data:
        raise ValueError("No valid body mass and flipper length measurements were found.")

    fig, ax = plt.subplots(figsize=(10, 7), layout="constrained")

    for index, island in enumerate(sorted(data)):
        masses, flippers = data[island]
        color = ISLAND_COLORS.get(island, plt.cm.tab10(index))
        ax.scatter(
            masses,
            flippers,
            color=color,
            alpha=0.72,
            s=48,
            edgecolors="white",
            linewidths=0.45,
            label=island,
        )

        # Fit and draw an independent least-squares linear trend line per island.
        if len(masses) >= 2 and len(set(masses)) >= 2:
            slope, intercept = np.polyfit(masses, flippers, 1)
            x_line = np.linspace(min(masses), max(masses), 100)
            ax.plot(x_line, slope * x_line + intercept, color=color, linewidth=2.4)

    ax.set_title("Penguin Flipper Length vs. Body Mass by Island", pad=12, weight="bold")
    ax.set_xlabel("Body mass (g)")
    ax.set_ylabel("Flipper length (mm)")
    ax.grid(True, color="#D9D9D9", linewidth=0.8, alpha=0.7)
    ax.set_axisbelow(True)
    ax.legend(title="Island", frameon=True, loc="best")

    fig.savefig(OUTPUT_FILE, dpi=300, bbox_inches="tight")
    plt.close(fig)
    print(f"Saved graph to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
