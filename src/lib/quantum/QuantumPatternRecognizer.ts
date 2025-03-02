import { QuantumNeuralNetwork, QuantumState } from "./QuantumNeuralNetwork";

export class QuantumPatternRecognizer {
  private network: QuantumNeuralNetwork;
  private readonly inputSize: number;
  private readonly hiddenSize: number;

  constructor(inputSize: number = 4, hiddenSize: number = 8) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.network = new QuantumNeuralNetwork(inputSize, hiddenSize);
  }

  recognizePattern(input: number[]): {
    states: QuantumState[];
    coherence: number;
    resonance: number;
  } {
    // Get quantum states from network
    const states = this.network.forward(input);

    // Calculate quantum coherence
    const coherence = this.calculateCoherence(states);

    // Calculate quantum resonance
    const resonance = this.calculateResonance(states);

    return { states, coherence, resonance };
  }

  private calculateCoherence(states: QuantumState[]): number {
    // Calculate quantum coherence based on phase alignment
    const phaseAlignment =
      states.reduce((sum, state) => sum + Math.cos(state.phase), 0) /
      states.length;

    return Math.abs(phaseAlignment);
  }

  private calculateResonance(states: QuantumState[]): number {
    // Calculate quantum resonance based on amplitude correlation
    const amplitudes = states.map((s) => s.amplitude);
    const mean = amplitudes.reduce((sum, a) => sum + a, 0) / amplitudes.length;

    const correlation =
      amplitudes.reduce((sum, a) => sum + (a - mean) * (a - mean), 0) /
      amplitudes.length;

    return Math.exp(-correlation);
  }
}
