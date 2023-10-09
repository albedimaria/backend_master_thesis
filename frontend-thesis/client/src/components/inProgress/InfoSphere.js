import { useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Slider } from 'antd'

function Box() {
    const [size, set] = useState(0.5)
    const controls = useThree((state) => state.controls)
    return (
        <group position={[0, 20, 0]}>
            <mesh scale={size * 2}>
                <boxGeometry />
                <meshStandardMaterial />
                <Html occlude distanceFactor={3} position={[0, 0, 0.51]} transform>
                    <span>Size</span>
                    <Slider
                        style={{ width: 100 }}
                        min={0.5}
                        max={1}
                        step={0.01}
                        value={size}
                        onChange={(value) => ((controls.enabled = false), set(value))}
                        onAfterChange={() => (controls.enabled = true)}
                    />
                </Html>
            </mesh>
        </group>

    )
}

export default function InfoSphere() {
    return (
        <Box />
    )
}
