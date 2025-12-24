"use client";

import { motion } from "motion/react";

export function FloatingWireframe() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			{/* Innovative Dashed Grid with Crosshairs */}
			<div className="absolute inset-0 opacity-20">
				<svg
					className="h-full w-full text-foreground"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<pattern
							id="grid-pattern"
							width="50"
							height="50"
							patternUnits="userSpaceOnUse"
						>
							{/* Dashed Lines */}
							<path
								d="M 50 0 L 0 0 0 50"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								strokeDasharray="4 4"
							/>
							{/* Crosshairs at intersections */}
							<path
								d="M 0 4 L 0 -4 M -4 0 L 4 0"
								stroke="currentColor"
								strokeWidth="1"
								fill="none"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid-pattern)" />
				</svg>
			</div>

			{/* Glowing Pulse Circle */}
			<div className="absolute inset-0 flex items-center justify-center">
				<motion.div
					className="h-[500px] w-[500px] rounded-full bg-primary/15 blur-[80px]"
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			{/* Floating Wireframe Shapes */}
			<div className="absolute inset-0 flex items-center justify-center perspective-1000">
				{/* Shape 1: Cube */}
				<motion.div
					className="absolute h-64 w-64 border border-primary/30"
					style={{ transformStyle: "preserve-3d" }}
					animate={{
						rotateX: [0, 360],
						rotateY: [0, 360],
						rotateZ: [0, 180],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				>
					<div className="absolute inset-0 border border-primary/30 [transform:translateZ(32px)]" />
					<div className="absolute inset-0 border border-primary/30 [transform:translateZ(-32px)]" />
					<div className="absolute inset-0 border border-primary/30 [transform:rotateY(90deg)_translateZ(32px)]" />
					<div className="absolute inset-0 border border-primary/30 [transform:rotateY(90deg)_translateZ(-32px)]" />
					<div className="absolute inset-0 border border-primary/30 [transform:rotateX(90deg)_translateZ(32px)]" />
					<div className="absolute inset-0 border border-primary/30 [transform:rotateX(90deg)_translateZ(-32px)]" />
				</motion.div>

				{/* Shape 2: Outer Ring */}
				<motion.div
					className="absolute h-96 w-96 rounded-full border border-dashed border-primary/40"
					animate={{ rotate: -360 }}
					transition={{
						duration: 40,
						repeat: Infinity,
						ease: "linear",
					}}
				/>

				{/* Shape 3: Inner Ring */}
				<motion.div
					className="absolute h-80 w-80 rounded-full border border-dotted border-primary/50"
					animate={{ rotate: 360 }}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: "linear",
					}}
				/>

				{/* Floating Particles */}
				<motion.div
					className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/50"
					animate={{
						y: [-20, 20, -20],
						opacity: [0.2, 0.8, 0.2],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-primary/40"
					animate={{
						y: [20, -20, 20],
						opacity: [0.2, 0.8, 0.2],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}
				/>
			</div>
		</div>
	);
}
