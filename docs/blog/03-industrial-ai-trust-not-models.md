# Industrial AI Is Mostly Trust, Not Models

- **Status:** outlined
- **Type:** industrial AI / professional deep dive
- **Primary sources:** Taliman-ML, Continental R&D data science background,
  materials/metallurgy background
- **Length:** ~1,200 words
- **Core claim:** in industrial AI, the model is rarely the hard part. Trust,
  uncertainty, standards, ground truth, and human review are the hard parts.

## Hook

The model could predict a spheroidization score. That was not enough. In a
factory context, the more important question is: when should the model be
allowed to stay quiet and ask a human?

## Why this fits me

This is the strongest professional credibility post. It connects metallurgy,
manufacturing, data science, and practical AI without sounding like a toy demo.

## Evidence

- Taliman-ML: ASTM F2282-18 spheroidization rating POC.
- CNN-only pipeline after archiving the OpenCV baseline.
- EfficientNet-B0 / PyTorch / Gradio pilot.
- 10-model ensemble and confidence from model disagreement.
- Grad-CAM for interpretability.
- Human-in-the-loop output: Accept, Spot-Check, Manual Review.
- Accuracy paradox: high overall accuracy but weak minority-class detection.

## Structure

1. Plain-English explanation of spheroidization rating and why consistency
   matters.
2. Why the OpenCV-style baseline was not enough for real image variance.
3. Why a single accuracy number was misleading.
4. The pivot from MC-dropout to ensemble disagreement as a more useful signal.
5. Why the UI removed technical metrics and showed actions instead.
6. The HIL lesson: industrial AI should accelerate experts before replacing
   judgment.

## One concrete artifact

Decision table:

| Prediction | Confidence | User action |
|------------|------------|-------------|
| clear OK | high | Accept |
| borderline | medium | Spot-check |
| uncertain or minority-risk | low | Manual review |

## Takeaway

The standard is your test suite, the expert is your ground truth, and uncertainty
is part of the product.

## Risks

- No proprietary images, client data, or factory details.
- Be careful with performance claims; always include limitations and HIL scope.
