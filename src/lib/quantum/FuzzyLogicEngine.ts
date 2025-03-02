import { QuantumNeuralNetwork } from "./QuantumNeuralNetwork";
import { QuantumFeedforwardNN } from "./QuantumFeedforwardNN";
import { CosmicWaltz } from "./CosmicWaltz";

export type FuzzyValue = number; // 0 to 1 representing membership degree

export interface FuzzyRule {
  antecedent: (inputs: FuzzyValue[]) => FuzzyValue;
  consequent: (inputs: FuzzyValue[]) => FuzzyValue[];
}

export class FuzzyLogicEngine {
  private rules: FuzzyRule[] = [];
  private quantumNN: QuantumFeedforwardNN;
  private cosmicWaltz: CosmicWaltz;

  constructor(
    inputSize: number = 4,
    hiddenSize: number = 16,
    outputSize: number = 4,
  ) {
    this.quantumNN = new QuantumFeedforwardNN(
      inputSize,
      hiddenSize,
      outputSize,
    );
    this.cosmicWaltz = new CosmicWaltz(inputSize, hiddenSize);
    this.initializeRules();
  }

  private initializeRules() {
    // Superposition rule - combines multiple inputs with quantum-inspired weighting
    this.rules.push({
      antecedent: (inputs) => Math.min(...inputs), // T-norm (AND operation)
      consequent: (inputs) => {
        const result = this.quantumNN.forward(inputs);
        return result.map((v) => Math.max(0, Math.min(1, v))); // Ensure values are in [0,1]
      },
    });

    // Entanglement rule - creates correlations between outputs
    this.rules.push({
      antecedent: (inputs) => Math.max(...inputs), // T-conorm (OR operation)
      consequent: (inputs) => {
        const waltzResult = this.cosmicWaltz.interact(
          inputs,
          inputs.map((i) => 1 - i),
        );
        return waltzResult.finalState.map((v) => Math.max(0, Math.min(1, v)));
      },
    });

    // Quantum walk rule - explores solution space with quantum-inspired diffusion
    this.rules.push({
      antecedent: (inputs) =>
        inputs.reduce((sum, val) => sum + val, 0) / inputs.length, // Average
      consequent: (inputs) => {
        const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
        return inputs.map((v) =>
          Math.max(0, Math.min(1, (Math.sin(v * phi * Math.PI) + 1) / 2)),
        );
      },
    });
  }

  // Fuzzification - convert crisp inputs to fuzzy values
  fuzzify(input: number, min: number, max: number): FuzzyValue {
    return Math.max(0, Math.min(1, (input - min) / (max - min)));
  }

  // Defuzzification - convert fuzzy values to crisp outputs using centroid method
  defuzzify(
    fuzzyValues: FuzzyValue[],
    mins: number[],
    maxes: number[],
  ): number[] {
    return fuzzyValues.map((fv, i) => mins[i] + fv * (maxes[i] - mins[i]));
  }

  // Process inputs through the fuzzy logic system
  process(inputs: number[], mins: number[], maxes: number[]): number[] {
    // Fuzzify inputs
    const fuzzyInputs = inputs.map((input, i) =>
      this.fuzzify(input, mins[i], maxes[i]),
    );

    // Apply rules and aggregate results
    const ruleOutputs = this.rules.map((rule) => {
      const antecedentStrength = rule.antecedent(fuzzyInputs);
      const consequentValues = rule.consequent(fuzzyInputs);
      // Scale consequent by antecedent strength
      return consequentValues.map((v) => Math.min(v, antecedentStrength));
    });

    // Aggregate rule outputs (using max operator)
    const aggregatedOutputs = Array(ruleOutputs[0].length).fill(0);
    for (let i = 0; i < aggregatedOutputs.length; i++) {
      for (const ruleOutput of ruleOutputs) {
        aggregatedOutputs[i] = Math.max(aggregatedOutputs[i], ruleOutput[i]);
      }
    }

    // Defuzzify to get crisp outputs
    return this.defuzzify(aggregatedOutputs, mins, maxes);
  }

  // Generate a quantum-inspired symbolic sequence
  generateSymbolicSequence(): string {
    return this.cosmicWaltz.generateSymbolicSequence();
  }
}
