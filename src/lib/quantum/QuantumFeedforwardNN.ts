import { QuantumResonantLayer } from "./QuantumResonantLayer";

export class QuantumFeedforwardNN {
  private inputLayer: QuantumResonantLayer;
  private hiddenLayer: QuantumResonantLayer;
  private readonly inputQubits: number;
  private readonly hiddenSize: number;
  private readonly outputSize: number;

  constructor(inputQubits: number, hiddenSize: number, outputSize: number) {
    this.inputQubits = inputQubits;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;

    // Initialize layers
    this.inputLayer = new QuantumResonantLayer(inputQubits, hiddenSize);
    this.hiddenLayer = new QuantumResonantLayer(hiddenSize, outputSize);
  }

  forward(input: number[]): number[] {
    // Forward pass through the network
    const hiddenOutput = this.inputLayer.forward(input);
    return this.hiddenLayer.forward(hiddenOutput);
  }

  updateWeights(
    learningRate: number,
    gradients: { input: number[]; hidden: number[] },
  ): void {
    this.inputLayer.updateWeights(learningRate, gradients.input);
    this.hiddenLayer.updateWeights(learningRate, gradients.hidden);
  }
}
