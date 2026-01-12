"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { getPerfTier, prefersReducedMotion } from "@/lib/perf"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial color="#f59e0b" roughness={0.1} metalness={0.8} distort={0.3} speed={2} />
      </mesh>
    </Float>
  )
}

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[3, -1, -2]} scale={1.2}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.9} wireframe />
      </mesh>
    </Float>
  )
}

function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3 - 2
    }
  })

  return (
    <mesh ref={meshRef} position={[-3, -2, -1]} scale={0.8}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.7} wireframe />
    </mesh>
  )
}

export function Scene3D() {
  const [enabled, setEnabled] = useState(false)
  const [perfTier, setPerfTier] = useState<"low" | "mid" | "high">("high")

  useEffect(() => {
    let readyHandler: ((e: Event) => void) | null = null
    if (prefersReducedMotion()) {
      setEnabled(false)
      return
    }
    const tier = getPerfTier()
    setPerfTier(tier)
    const enable = () => setEnabled(tier === "high")
    if (document.documentElement.dataset.tenexReady === "true") {
      enable()
    } else {
      const handleReady = () => {
        if (readyHandler) {
          window.removeEventListener("tenex:ready", readyHandler as EventListener)
        }
        enable()
      }
      readyHandler = handleReady
      window.addEventListener("tenex:ready", readyHandler as EventListener)
    }
    return () => {
      if (readyHandler) {
        window.removeEventListener("tenex:ready", readyHandler as EventListener)
      }
    }
  }, [])

  const dpr = perfTier === "mid" ? [1, 1.25] : [1, 1.5]

  if (!enabled) return null

  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
          <AnimatedSphere />
          <AnimatedTorus />
          <AnimatedBox />
          {perfTier === "high" ? <Environment preset="city" /> : null}
        </Suspense>
      </Canvas>
    </div>
  )
}
