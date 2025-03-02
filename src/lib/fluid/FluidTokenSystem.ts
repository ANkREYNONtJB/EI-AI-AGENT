import { GoldenRatioTransform } from "../GoldenRatioTransform";
import { HolographicTransform } from "../HolographicTransform";

export interface FluidToken {
  id: string;
  resonance: number;
  symbolicSequence: string;
  cognitiveState: number[];
}

export class FluidTokenSystem {
  private tokens: Map<string, FluidToken> = new Map();
  private goldenTransform: GoldenRatioTransform;
  private holoTransform: HolographicTransform;
  private readonly phi = (1 + Math.sqrt(5)) / 2;

  constructor() {
    this.goldenTransform = new GoldenRatioTransform(4);
    this.holoTransform = new HolographicTransform(4);
  }

  mintToken(symbolicSequence: string): FluidToken {
    const id = `fluid-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const timeScale = Date.now() / 1000;
    const resonance = this.holoTransform.generateResonance(timeScale);
    const cognitiveState = this.goldenTransform.transform([
      resonance,
      this.phi,
      Math.PI,
      Math.E,
    ]);

    const token: FluidToken = {
      id,
      resonance: Math.abs(resonance),
      symbolicSequence,
      cognitiveState,
    };

    this.tokens.set(id, token);
    return token;
  }

  getToken(id: string): FluidToken | undefined {
    return this.tokens.get(id);
  }

  evolveToken(id: string): FluidToken | undefined {
    const token = this.tokens.get(id);
    if (!token) return undefined;

    const timeScale = Date.now() / 1000;
    const newResonance =
      this.holoTransform.generateResonance(timeScale) * token.resonance;
    const newCognitiveState = this.goldenTransform.transform(
      token.cognitiveState,
    );

    const evolvedToken: FluidToken = {
      ...token,
      resonance: Math.abs(newResonance),
      cognitiveState: newCognitiveState,
    };

    this.tokens.set(id, evolvedToken);
    return evolvedToken;
  }

  transferResonance(fromId: string, toId: string, amount: number): boolean {
    const fromToken = this.tokens.get(fromId);
    const toToken = this.tokens.get(toId);

    if (!fromToken || !toToken || fromToken.resonance < amount) return false;

    const updatedFromToken: FluidToken = {
      ...fromToken,
      resonance: fromToken.resonance - amount,
    };

    const updatedToToken: FluidToken = {
      ...toToken,
      resonance: toToken.resonance + amount,
    };

    this.tokens.set(fromId, updatedFromToken);
    this.tokens.set(toId, updatedToToken);

    return true;
  }

  getAllTokens(): FluidToken[] {
    return Array.from(this.tokens.values());
  }
}
