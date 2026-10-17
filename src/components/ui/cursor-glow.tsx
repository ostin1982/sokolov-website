'use client';

import { useEffect, useRef } from 'react';

interface CursorGlowProps {
  dotSize?: number;
  dotGap?: number;
  radius?: number;
}

export default function CursorGlow({
  dotSize = 2,
  dotGap = 18,
  radius = 1.5
}: CursorGlowProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false });

    if (!section || !canvas) return;
    if (!gl) {
      console.warn('WebGL is unavailable; cursor glow is disabled.');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 a_position;

      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_pointer;
      uniform vec2 u_resolution;
      uniform float u_pixel_ratio;
      uniform float u_strength;
      uniform float u_dot_size;
      uniform float u_pattern_size;
      uniform float u_dot_gap;
      uniform float u_radius;

      void main() {
        vec2 pixel = gl_FragCoord.xy / u_pixel_ratio;
        vec2 center = u_resolution * 0.5;
        vec2 dotOrigin = center + vec2(-u_dot_gap * 0.5, u_dot_gap * 0.5);
        vec2 dotCenter = dotOrigin + floor((pixel - dotOrigin) / u_pattern_size + 0.5) * u_pattern_size;
        vec2 dotOffset = abs(pixel - dotCenter);

        if (dotOffset.x > u_dot_size * 0.5 || dotOffset.y > u_dot_size * 0.5) {
          discard;
        }

        vec2 pointer = u_pointer * u_resolution;
        vec2 offset = (dotCenter - pointer) * vec2(u_resolution.x / u_resolution.y, 1.0) / u_resolution.y;
        float distanceFromPointer = length(offset);
        float alpha = exp(-distanceFromPointer * distanceFromPointer * 100.0 / (u_radius * u_radius)) * u_strength;
        gl_FragColor = vec4(0.0, 0.871, 0.373, alpha);
      }
    `;

    const compileShader = (
      type: number,
      source: string
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error('Failed to create cursor glow shader.');
        return null;
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          'Failed to compile cursor glow shader:',
          gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create cursor glow WebGL program.');
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        'Failed to link cursor glow WebGL program:',
        gl.getProgramInfoLog(program)
      );
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      console.error('Failed to create cursor glow WebGL buffer.');
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const pixelRatioLocation = gl.getUniformLocation(program, 'u_pixel_ratio');
    const strengthLocation = gl.getUniformLocation(program, 'u_strength');
    const dotSizeLocation = gl.getUniformLocation(program, 'u_dot_size');
    const patternSizeLocation = gl.getUniformLocation(
      program,
      'u_pattern_size'
    );
    const dotGapLocation = gl.getUniformLocation(program, 'u_dot_gap');
    const radiusLocation = gl.getUniformLocation(program, 'u_radius');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const pointer = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let strength = 0;
    let targetStrength = 0;
    let frameId: number | null = null;
    let fadeTimeout: number | null = null;

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0, 0, 0, 0);
    gl.uniform1f(dotSizeLocation, dotSize);
    gl.uniform1f(patternSizeLocation, dotSize + dotGap);
    gl.uniform1f(dotGapLocation, dotGap);
    gl.uniform1f(radiusLocation, radius);

    const renderFrame = () => {
      frameId = null;

      if (prefersReducedMotion) {
        pointer.x = target.x;
        pointer.y = target.y;
        strength = targetStrength;
      } else {
        pointer.x += (target.x - pointer.x) * 0.1;
        pointer.y += (target.y - pointer.y) * 0.1;
        strength += (targetStrength - strength) * 0.1;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(pointerLocation, pointer.x, pointer.y);
      const bounds = section.getBoundingClientRect();
      gl.uniform2f(resolutionLocation, bounds.width, bounds.height);
      gl.uniform1f(
        pixelRatioLocation,
        canvas.width / Math.max(bounds.width, 1)
      );
      gl.uniform1f(strengthLocation, strength);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      const settled =
        Math.abs(pointer.x - target.x) < 0.001 &&
        Math.abs(pointer.y - target.y) < 0.001 &&
        Math.abs(strength - targetStrength) < 0.005;

      if (settled) {
        pointer.x = target.x;
        pointer.y = target.y;
        strength = targetStrength;
      } else {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const scheduleRender = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = section.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      scheduleRender();
    });

    const updatePointer = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      if (
        bounds.width === 0 ||
        bounds.height === 0 ||
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        targetStrength = 0;
        scheduleRender();
        return false;
      }

      target.x = (event.clientX - bounds.left) / bounds.width;
      target.y = 1 - (event.clientY - bounds.top) / bounds.height;
      targetStrength = 1;
      scheduleRender();
      return true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && event.buttons === 0) return;

      if (fadeTimeout !== null) {
        window.clearTimeout(fadeTimeout);
        fadeTimeout = null;
      }

      updatePointer(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (fadeTimeout !== null) {
        window.clearTimeout(fadeTimeout);
        fadeTimeout = null;
      }

      updatePointer(event);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;

      fadeTimeout = window.setTimeout(() => {
        targetStrength = 0;
        scheduleRender();
        fadeTimeout = null;
      }, 250);
    };

    const handlePointerLeave = () => {
      if (fadeTimeout !== null) {
        window.clearTimeout(fadeTimeout);
        fadeTimeout = null;
      }

      targetStrength = 0;
      scheduleRender();
    };

    resizeObserver.observe(section);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerLeave);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerLeave);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (fadeTimeout !== null) window.clearTimeout(fadeTimeout);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [dotGap, dotSize, radius]);

  return (
    <div
      ref={sectionRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ filter: 'drop-shadow(0 0 1px #00de5f)' }}
      />
    </div>
  );
}
