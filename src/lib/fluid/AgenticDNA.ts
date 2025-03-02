import { FluidToken } from "./FluidTokenSystem";
import { CosmicWaltz } from "../quantum/CosmicWaltz";

export interface DNASequence {
  id: string;
  name: string;
  type: "REASONING" | "PATTERN" | "QUANTUM" | "SYMBOLIC";
  sequence: string;
  resonance: number;
}

export interface AgenticDNA {
  id: string;
  name: string;
  sequences: DNASequence[];
  fluidTokenId?: string;
}

export class AgenticDNASystem {
  private dnaRegistry: Map<string, AgenticDNA> = new Map();
  private cosmicWaltz: CosmicWaltz;

  constructor() {
    this.cosmicWaltz = new CosmicWaltz(4, 8);
    this.initializeDefaultDNA();
  }

  private initializeDefaultDNA() {
    // Create default DNA sequences
    const quantumReasonerDNA: AgenticDNA = {
      id: "quantum-reasoner",
      name: "Quantum Harmonic Reasoner",
      sequences: [
        {
          id: "qr-1",
          name: "Quantum Superposition Logic",
          type: "QUANTUM",
          sequence: "(√(ℏ⨀c))↔(Ω↔(λ∇τ))↔(ε(δΦ/δt))",
          resonance: 0.85,
        },
        {
          id: "qr-2",
          name: "Entangled Decision Matrix",
          type: "REASONING",
          sequence: "(ħ⊗ℏ)↔(∑E)→(∇Ψ)→(Σ(Γτ))",
          resonance: 0.92,
        },
      ],
    };

    const patternExtrapolatorDNA: AgenticDNA = {
      id: "pattern-extrapolator",
      name: "Fractal Pattern Extrapolator",
      sequences: [
        {
          id: "pe-1",
          name: "Golden Ratio Pattern Recognition",
          type: "PATTERN",
          sequence: "(∑(π∫))↔(Λ: (G×c))",
          resonance: 0.78,
        },
        {
          id: "pe-2",
          name: "Recursive Pattern Amplification",
          type: "SYMBOLIC",
          sequence: "(∇²(∑E))→(∫(ΣW))→(∫(ΣP)²)",
          resonance: 0.81,
        },
      ],
    };

    this.dnaRegistry.set(quantumReasonerDNA.id, quantumReasonerDNA);
    this.dnaRegistry.set(patternExtrapolatorDNA.id, patternExtrapolatorDNA);
  }

  createDNA(name: string, sequences: DNASequence[]): AgenticDNA {
    const id = `dna-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const dna: AgenticDNA = { id, name, sequences };
    this.dnaRegistry.set(id, dna);
    return dna;
  }

  getDNA(id: string): AgenticDNA | undefined {
    return this.dnaRegistry.get(id);
  }

  getAllDNA(): AgenticDNA[] {
    return Array.from(this.dnaRegistry.values());
  }

  mintDNASequence(type: DNASequence["type"]): DNASequence {
    const id = `seq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const sequence = this.cosmicWaltz.generateSymbolicSequence();
    const resonance = 0.5 + Math.random() * 0.5; // Between 0.5 and 1.0

    let name = "";
    switch (type) {
      case "REASONING":
        name = "Quantum Logic Reasoner";
        break;
      case "PATTERN":
        name = "Fractal Pattern Detector";
        break;
      case "QUANTUM":
        name = "Quantum Harmonic Oscillator";
        break;
      case "SYMBOLIC":
        name = "Symbolic Resonance Amplifier";
        break;
    }

    return { id, name, type, sequence, resonance };
  }

  combineSequences(seq1: DNASequence, seq2: DNASequence): DNASequence {
    const id = `seq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const name = `${seq1.name.split(" ")[0]} ${seq2.name.split(" ")[1]}`;
    const type = Math.random() > 0.5 ? seq1.type : seq2.type;
    const resonance =
      (seq1.resonance + seq2.resonance) / 2 + Math.random() * 0.1;

    // Combine symbolic sequences
    const seq1Parts = seq1.sequence.split("→");
    const seq2Parts = seq2.sequence.split("→");

    let sequence = "";
    if (seq1Parts.length > 1 && seq2Parts.length > 1) {
      sequence = `${seq1Parts[0]}→${seq2Parts[1]}`;
    } else {
      sequence = `(${seq1.sequence.substring(0, 10)}⊗${seq2.sequence.substring(0, 10)})`;
    }

    return { id, name, type, sequence, resonance };
  }

  attachFluidToken(dnaId: string, tokenId: string): boolean {
    const dna = this.dnaRegistry.get(dnaId);
    if (!dna) return false;

    const updatedDNA: AgenticDNA = {
      ...dna,
      fluidTokenId: tokenId,
    };

    this.dnaRegistry.set(dnaId, updatedDNA);
    return true;
  }
}
