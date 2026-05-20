# Asset slots

Drop real assets into these paths. Components fall back gracefully (swatch
gradient) when the file is missing — no broken images.

```
public/
├── hero/
│   ├── prop.webp           # Hero centerpiece (e.g. product mock, monogram). ~1200×1200.
│   └── reel.mp4            # Optional showreel — plays in the modal when the "Watch reel" button is clicked.
├── work/
│   ├── igaprep/cover.webp
│   ├── firstinqueue/cover.webp
│   ├── predictioncube/cover.webp
│   └── escholr/cover.webp  # 4:5 portrait covers, ~1600×2000.
├── studio/
│   ├── portrait-1.webp     # ~800×1100.
│   └── portrait-2.webp
└── testimonials/
    ├── igaprep-founder.webp        # Square or 4:5 video poster / portrait.
    ├── firstinqueue-ops.webp
    └── predictioncube-cto.webp
```

Replace `.webp` with `.mp4` and update the corresponding `image: …` to `video: …`
in `lib/content.ts` if you want a looping video card instead of a still.
