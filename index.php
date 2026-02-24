<!doctype html> 
<html lang="en"> 
<head> 
	<style type="text/css">
		html,body{
			padding: 0;
			margin: 0;
			background: #fff;
			height: 100%;
			overflow: hidden;
			text-align: center;
		}
		#container{
			display: inline-block;
		}
		canvas{
			margin: 0 auto;
		}
	</style>
	<meta charset="UTF-8" />
	<title>MICHELIN ANAKEE</title>
</head>
<?php
	$base_url = "https://mykindofride.michelin.co.id/";
?>

<body>
    <div id="container"></div>

    <script type="text/javascript" src="assets/js/jquery-1.12.4.js"></script>
	<script type="text/javascript" src="assets/js/phaser.min.js"></script>
	<script type="text/javascript" src="assets/js/menu_state.js"></script>
	<script type="text/javascript" src="assets/js/game_state.js"></script>
	<script type="text/javascript" src="assets/js/finish_state.js"></script>
	<script type="text/javascript" src="assets/js/leaderboard_state.js"></script>
    <script type="text/javascript" src="assets/js/engine.js"></script>
    <!-- <script type="text/javascript" src="<?= $base_url; ?>js/common.js"></script> -->

    <script type="text/javascript">
    	var engine = new Engine({
    	// 	base_url : "<?= $base_url; ?>"
    	});
    </script>
</body>
</html>
