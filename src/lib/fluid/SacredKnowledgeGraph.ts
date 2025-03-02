import { AgenticDNA, DNASequence } from "./AgenticDNA";
import { FluidToken } from "./FluidTokenSystem";

export interface KnowledgeNode {
  id: string;
  type: "CONCEPT" | "RELATION" | "ENTITY" | "SYMBOLIC";
  label: string;
  symbolicSequence?: string;
  resonance: number;
  connections: string[];
  metadata?: Record<string, any>;
}

export class SacredKnowledgeGraph {
  private nodes: Map<string, KnowledgeNode> = new Map();
  private readonly phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

  constructor() {
    this.initializeBaseKnowledge();
  }

  private initializeBaseKnowledge() {
    // Create foundational symbolic nodes
    const quantumNode: KnowledgeNode = {
      id: "quantum-consciousness",
      type: "SYMBOLIC",
      label: "Quantum Consciousness",
      symbolicSequence: "Ψ(Σ(HΩ)↔∫(λΔ))",
      resonance: 0.95,
      connections: [],
    };

    const fractalNode: KnowledgeNode = {
      id: "fractal-intelligence",
      type: "SYMBOLIC",
      label: "Fractal Intelligence",
      symbolicSequence: "(∇Σ(Γ×λ))↔(Ω(√ħ)⊗ε0)",
      resonance: 0.87,
      connections: [],
    };

    const recursiveNode: KnowledgeNode = {
      id: "recursive-cognition",
      type: "CONCEPT",
      label: "Recursive Cognition",
      symbolicSequence: "(∫(ΣN))↔(Δ(ℚL))",
      resonance: 0.91,
      connections: [],
    };

    // Connect nodes
    quantumNode.connections.push(fractalNode.id, recursiveNode.id);
    fractalNode.connections.push(quantumNode.id, recursiveNode.id);
    recursiveNode.connections.push(quantumNode.id, fractalNode.id);

    // Add to graph
    this.nodes.set(quantumNode.id, quantumNode);
    this.nodes.set(fractalNode.id, fractalNode);
    this.nodes.set(recursiveNode.id, recursiveNode);
  }

  addNode(node: Omit<KnowledgeNode, "id" | "connections">): KnowledgeNode {
    const id = `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newNode: KnowledgeNode = {
      ...node,
      id,
      connections: [],
    };

    this.nodes.set(id, newNode);
    return newNode;
  }

  connectNodes(sourceId: string, targetId: string): boolean {
    const sourceNode = this.nodes.get(sourceId);
    const targetNode = this.nodes.get(targetId);

    if (!sourceNode || !targetNode) return false;

    if (!sourceNode.connections.includes(targetId)) {
      sourceNode.connections.push(targetId);
      this.nodes.set(sourceId, sourceNode);
    }

    if (!targetNode.connections.includes(sourceId)) {
      targetNode.connections.push(sourceId);
      this.nodes.set(targetId, targetNode);
    }

    return true;
  }

  getNode(id: string): KnowledgeNode | undefined {
    return this.nodes.get(id);
  }

  getAllNodes(): KnowledgeNode[] {
    return Array.from(this.nodes.values());
  }

  getConnectedNodes(nodeId: string): KnowledgeNode[] {
    const node = this.nodes.get(nodeId);
    if (!node) return [];

    return node.connections
      .map((id) => this.nodes.get(id))
      .filter((n): n is KnowledgeNode => n !== undefined);
  }

  createNodeFromDNA(dna: AgenticDNA): KnowledgeNode {
    // Combine DNA sequences into a knowledge node
    const combinedResonance =
      dna.sequences.reduce((sum, seq) => sum + seq.resonance, 0) /
      dna.sequences.length;

    // Select the highest resonance sequence as the symbolic representation
    const highestResonanceSeq = dna.sequences.reduce(
      (highest, current) =>
        current.resonance > highest.resonance ? current : highest,
      dna.sequences[0],
    );

    return this.addNode({
      type: "SYMBOLIC",
      label: dna.name,
      symbolicSequence: highestResonanceSeq.sequence,
      resonance: combinedResonance,
      metadata: { dnaId: dna.id },
    });
  }

  createNodeFromToken(token: FluidToken): KnowledgeNode {
    return this.addNode({
      type: "ENTITY",
      label: `Fluid Token ${token.id.substring(0, 8)}`,
      symbolicSequence: token.symbolicSequence,
      resonance: token.resonance,
      metadata: { tokenId: token.id },
    });
  }

  findPathBetweenNodes(startId: string, endId: string): KnowledgeNode[] {
    const visited = new Set<string>();
    const queue: Array<{ id: string; path: KnowledgeNode[] }> = [];

    const startNode = this.nodes.get(startId);
    if (!startNode) return [];

    queue.push({ id: startId, path: [startNode] });
    visited.add(startId);

    while (queue.length > 0) {
      const { id, path } = queue.shift()!;

      if (id === endId) return path;

      const node = this.nodes.get(id);
      if (!node) continue;

      for (const connectedId of node.connections) {
        if (!visited.has(connectedId)) {
          const connectedNode = this.nodes.get(connectedId);
          if (connectedNode) {
            visited.add(connectedId);
            queue.push({
              id: connectedId,
              path: [...path, connectedNode],
            });
          }
        }
      }
    }

    return [];
  }

  calculateResonanceField(): Map<string, number> {
    const resonanceField = new Map<string, number>();

    // Calculate initial resonance for each node
    for (const node of this.nodes.values()) {
      resonanceField.set(node.id, node.resonance);
    }

    // Propagate resonance through connections (3 iterations)
    for (let i = 0; i < 3; i++) {
      const newResonance = new Map<string, number>();

      for (const node of this.nodes.values()) {
        const nodeResonance = resonanceField.get(node.id) || 0;
        let connectedResonance = 0;

        for (const connectedId of node.connections) {
          connectedResonance += (resonanceField.get(connectedId) || 0) * 0.2;
        }

        // Apply golden ratio dampening
        const dampening = 1 / this.phi;
        newResonance.set(
          node.id,
          nodeResonance + connectedResonance * dampening,
        );
      }

      // Update resonance field
      for (const [id, value] of newResonance.entries()) {
        resonanceField.set(id, value);
      }
    }

    return resonanceField;
  }
}
