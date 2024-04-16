<script lang="ts">
	// Not needed for an about page, but just playing around with Svelte features.
	import { personalInfo, courseInfo} from '$lib/data.js';
	</script>
	
	<svelte:head>
		<title>About</title>
		<meta name="description" content="About this portfolio" />
	</svelte:head>
	
	<div class="text-column">
		<h1><span>{personalInfo.name}'s Portfolio</span></h1>
		<h2>{courseInfo.number} <span class="title">{courseInfo.title} at {courseInfo.institution}</span></h2>
	
		<p>
			This is a portfolio of my work for this course taken during the {courseInfo.term} term.  Each assignment has it's own page, and there is also a page for the final project.  It showcases my work and what I have learned in this course about computer graphics, <a href="https://www.khronos.org/api/webgl">WebGL</a>, <a href="https://threejs.org/">three.js</a>, and other topics such as <a href="https://webassembly.org/">WASM</a>, <a href="https://svelte.dev/">Svelte</a>, and data visualization with <a href="https://d3js.org/">D3.js</a>.
		</p>
		<ul>
			<!-- <li>Source code:  <a href="{personalInfo.githubURL}">{personalInfo.githubURL}/coming/soon</a></li> -->
			<li>Source code: coming soon...</li>
			<li>Class repository: <a href="{courseInfo.githubURL}">{courseInfo.githubURL}</a></li>
		</ul>
	
	
	</div>
	
	<style>
		h1 span {
			border-bottom: 2px solid #333;
			padding-bottom: 10px;
			display: inline-block;
		}
		h2 {
			font-size: 1.5rem;
			text-align: center;
			margin-top: 0;
		}
		.title {
			font-style: italic;
		}
		ul li {
			list-style-type: none;
			position: relative;
			padding-left: 20px;
		}
		ul li::before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 18px; /* Adjust as needed */
			height: 18px; /* Adjust as needed */
			background-image: url('$lib/images/github.svg');
			background-size: contain;
			background-repeat: no-repeat;
		}
	</style>