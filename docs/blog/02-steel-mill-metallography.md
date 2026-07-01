# Teaching a Steel Mill to Rate Its Own Metallography

- **Status:** outlined
- **Type:** industrial-AI deep dive
- **Serves:** professional signal (your strongest differentiator)
- **Sources:** Taliman-ML
- **Length:** ~1,100 words
- **Why:** almost no AI blogger can tell this story. Rare, credible domain.

## Hook

Spheroidization rating is a human squinting at a microscope and matching what
they see to a chart in an ASTM standard. It's slow, subjective, and it gates
whether a batch of steel wire rod is good enough. So I tried to teach it.

## Angle

Not "look, a CNN." The interesting part is the *constraints* of real
industrial ML: the ground truth is a metallurgist's judgment, the standard
(ASTM F2282-18) is the spec, the images are few and expensive, and the win
condition is "a POC a factory would trust," not a Kaggle score.

## Outline

- What spheroidization rating is and why it matters (1 paragraph, plain).
- Why I **deleted the OpenCV baseline** — hand-tuned features couldn't survive
  real-world variance in the images; the data-driven CNN generalized where
  thresholds broke.
- What "accuracy" even means when your labels are one expert's opinion.
- POC-in-a-factory realities: small datasets, ASTM compliance, a Gradio UI so
  a metallurgist (not an ML engineer) can actually use it.

## Takeaway

Industrial ML is less about the model and more about respecting the domain:
the standard is your test suite, and the expert is your ground truth. Earn
their trust and the CNN is the easy part.

## Notes / risks

- Confirm what's shareable (Taliman = client/employer domain?). Keep it at the
  method level; no proprietary data or images.
- One figure: OpenCV-vs-CNN failure example, or the rating scale. Anonymized.
