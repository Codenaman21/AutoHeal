export const RESULTS: any = {
  image: {
    verdict: "MANIPULATED",
    confidence: 91,
    steps: [true, false, false, false],
    explanation: [
      "Metadata entropy mismatch detected",
      "Compression artifacts inconsistent with sensor profile",
      "GAN residual patterns identified",
      "Pixel coherence breach in facial landmarks"
    ],
    summary:
      "Image exhibits strong indicators of synthetic manipulation with high confidence."
  },
  audio: {
    verdict: "MANIPULATED",
    confidence: 84,
    steps: [true, true, false, false],
    explanation: [
      "Spectral noise inconsistency detected",
      "Pitch drift beyond human vocal bounds",
      "Neural vocoder fingerprint present",
      "Temporal phase smoothing anomaly"
    ],
    summary:
      "Audio signal likely generated or altered using AI-based synthesis."
  },
  video: {
    verdict: "AUTHENTIC",
    confidence: 73,
    steps: [true, true, true, true],
    explanation: [
      "Frame continuity verified",
      "Compression pipeline consistent",
      "No GAN spatial residue detected",
      "Temporal motion natural"
    ],
    summary:
      "No strong indicators of synthetic manipulation were detected."
  }
};
