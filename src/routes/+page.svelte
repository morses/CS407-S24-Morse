<script>
	import polyhedra from '$lib/images/polyhedra.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section>
	<div class="banner">
		<img src={polyhedra} alt="Welcome to my portfolio" />
	</div>
</section>
<div class="assignments text-column">
	<h1>Check out my Computer Graphics work!</h1>
	<ul>
		<li><a href="/assignment1">Hello World in 3D</a></li>
		<li><a href="/assignment1">Svelte app and web deployment</a> &lAarr; if you're seeing this on the web then it's working</li>
		<li><a href="/assignment3">World App &amp; Lighting</a></li>
		<li><a href="/assignment4">Hierarchical Scene &amp; Transformations with Animation</a></li>
	</ul>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		margin-top: 0px;
	}

	h1 {
		width: 100%;
	}

	.banner {
		text-align: center;
		border-right: 4px solid #333;
		border-left: 4px solid #333;
		border-radius: 10px;
	}
	.banner img {
		width: 600px;
		margin-right: -3px;
	}

	.assignments {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		flex: 0.4;
	}
</style>
