import { createElement, type ReactElement, type ReactNode } from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import CursorGlow from '@/components/ui/cursor-glow';
import { SectionMain } from '@/app/[locale]/components/section-main';

const bounds = {
  left: 10,
  top: 20,
  right: 110,
  bottom: 100,
  width: 100,
  height: 80,
  x: 10,
  y: 20,
  toJSON: () => ({})
} satisfies DOMRect;

const frameCallbacks = new Map<number, FrameRequestCallback>();
let nextFrameId = 0;
let gl: WebGLRenderingContext;
let pointerUniformCalls: Array<[string, number, number]>;
let strengthUniformCalls: Array<[string, number]>;

const makeWebGLContext = (): WebGLRenderingContext => {
  const context = {
    VERTEX_SHADER: 1,
    FRAGMENT_SHADER: 2,
    COMPILE_STATUS: 3,
    LINK_STATUS: 4,
    ARRAY_BUFFER: 5,
    STATIC_DRAW: 6,
    FLOAT: 7,
    BLEND: 8,
    SRC_ALPHA: 9,
    ONE: 10,
    COLOR_BUFFER_BIT: 11,
    TRIANGLE_STRIP: 12,
    createShader: vi.fn(() => ({})),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn(() => true),
    getShaderInfoLog: vi.fn(() => ''),
    deleteShader: vi.fn(),
    createProgram: vi.fn(() => ({})),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn(() => true),
    getProgramInfoLog: vi.fn(() => ''),
    deleteProgram: vi.fn(),
    createBuffer: vi.fn(() => ({})),
    bindBuffer: vi.fn(),
    bufferData: vi.fn(),
    getAttribLocation: vi.fn(() => 0),
    getUniformLocation: vi.fn((_: unknown, name: string) => name),
    useProgram: vi.fn(),
    enableVertexAttribArray: vi.fn(),
    vertexAttribPointer: vi.fn(),
    enable: vi.fn(),
    blendFunc: vi.fn(),
    clearColor: vi.fn(),
    uniform1f: vi.fn((location: string, value: number) => {
      if (location === 'u_strength') {
        strengthUniformCalls.push([location, value]);
      }
    }),
    uniform2f: vi.fn((location: string, x: number, y: number) => {
      if (location === 'u_pointer') {
        pointerUniformCalls.push([location, x, y]);
      }
    }),
    clear: vi.fn(),
    drawArrays: vi.fn(),
    viewport: vi.fn(),
    deleteBuffer: vi.fn()
  };

  return context as unknown as WebGLRenderingContext;
};

const flushFrame = () => {
  const [id, callback] = frameCallbacks.entries().next().value ?? [];
  if (id === undefined || !callback) return false;

  frameCallbacks.delete(id);
  callback(0);
  return true;
};

const findElement = (
  node: ReactNode,
  type: unknown
): ReactElement | undefined => {
  if (!node || typeof node !== 'object') return undefined;
  if ('type' in node && node.type === type) return node as ReactElement;
  if ('props' in node) {
    const children = (node as ReactElement<{ children?: ReactNode }>).props
      .children;
    if (Array.isArray(children)) {
      for (const child of children) {
        const found = findElement(child, type);
        if (found) return found;
      }
    } else {
      return findElement(children, type);
    }
  }
  return undefined;
};

const renderCursorGlow = () => render(createElement(CursorGlow));

describe('SectionMain cursor glow', () => {
  beforeEach(() => {
    frameCallbacks.clear();
    nextFrameId = 0;
    pointerUniformCalls = [];
    strengthUniformCalls = [];
    gl = makeWebGLContext();

    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(private readonly callback: ResizeObserverCallback) {}

        observe() {
          this.callback([], this as unknown as ResizeObserver);
        }

        unobserve() {}
        disconnect() {}
      }
    );
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      const id = ++nextFrameId;
      frameCallbacks.set(id, callback);
      return id;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      frameCallbacks.delete(id);
    });
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () => gl
    );
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      bounds
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('passes the intended dot pattern and glow radius from SectionMain', async () => {
    const element = await SectionMain();
    const cursorGlow = findElement(element, CursorGlow);

    expect(cursorGlow).toBeDefined();
    expect(cursorGlow?.props).toEqual({
      dotSize: 2,
      dotGap: 18,
      radius: 1.5
    });
  });

  it('follows pointer movement and increases dot brightness frame by frame', () => {
    const { container } = renderCursorGlow();
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith(
      'webgl',
      {
        alpha: true,
        antialias: false
      }
    );

    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 75,
        clientY: 40,
        pointerType: 'mouse'
      })
    );
    flushFrame();

    expect(pointerUniformCalls.at(-1)?.slice(1)).toEqual([0.515, 0.525]);
    expect(strengthUniformCalls.at(-1)?.[1]).toBeCloseTo(0.1);
    expect(gl.drawArrays).toHaveBeenCalled();

    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 90,
        clientY: 30,
        pointerType: 'mouse'
      })
    );
    flushFrame();

    const previousPosition = pointerUniformCalls.at(-2);
    const nextPosition = pointerUniformCalls.at(-1);
    const previousStrength = strengthUniformCalls.at(-2)?.[1] ?? 0;
    const nextStrength = strengthUniformCalls.at(-1)?.[1] ?? 0;

    expect(nextPosition?.[1]).toBeGreaterThan(previousPosition?.[1] ?? 0);
    expect(nextPosition?.[2]).toBeGreaterThan(previousPosition?.[2] ?? 0);
    expect(nextStrength).toBeGreaterThan(previousStrength);
    expect(container.querySelector('canvas')).not.toBeNull();
  });

  it('fades the glow when the pointer leaves the window', () => {
    renderCursorGlow();

    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 75,
        clientY: 40,
        pointerType: 'mouse'
      })
    );
    flushFrame();

    window.dispatchEvent(new Event('pointerleave'));
    flushFrame();

    expect(strengthUniformCalls.at(-1)?.[1]).toBeCloseTo(0.09);
  });
});
