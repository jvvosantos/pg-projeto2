<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <title>PG Projeto 2</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h4>Curvas de Bezier</h4>

  <div class="row">
    <button id="add-curve" class="box">Adicionar curva</button>
    <button id="previous-curve" class="box" disabled="true">Selecionar curva anterior</button>
    <button id="next-curve" class="box" disabled="true">Selecionar curva posterior</button>
    <button id="remove-curve" class="box" disabled="true">Excluir curva atual</button>
  </div>

  <div class="row">
    <button id="previous-point" class="box" disabled="true">Selecionar ponto anterior</button>
    <button id="next-point" class="box" disabled="true">Selecionar ponto posterior</button>
    <button id="remove-point" class="box" disabled="true">Excluir ponto atual</button>

    <p>Modo de manipulação:</p>
    <input type="radio" id="add-mode" name="manipulation-mode" value="add" checked>
    <label for="add-mode">Adicionar um ponto</label><br>
    <input type="radio" id="drag-mode" name="manipulation-mode" value="drag" disabled="true">
    <label for="drag-mode">Ajustar ponto atual</label><br>
  </div>

  <div class="row">
    <div class="box">
      <input type="checkbox" id="show-points" name="show-points" checked>
      <label for="show-points">Mostrar pontos</label>
    </div>

    <div class="box">
      <input type="checkbox" id="show-lines" name="show-lines" checked>
      <label for="show-lines">Mostrar polígonos de controle</label>
    </div>

    <div class="box">
      <input type="checkbox" id="show-curves" name="show-curves" checked>
      <label for="show-curves">Mostrar curvas de bezier</label>
    </div>

    <div class="box">
      <input type="number" id="num-eval" name="num-eval" value="100">
      <label for="num-eval">Número de avaliações</label>
    </div>
  </div>


  <canvas id="canvas" width="1366" height="768" class="canvas"></canvas>
</body>

<script src="main.js"></script>

</html>