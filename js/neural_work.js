
function display_content(canvas, node_index, node, content){

  const height = canvas.offsetHeight;
  let ctx = canvas.getContext("2d");
  let x = node.x;
  let y = node.y;
  ctx.fillStyle = "#e1eded";
  ctx.textAlign = "center";
  ctx.font = 0.1*height+"px Dancing Script";
  ctx.fillText(content.find("time").text(), x, y+0.21*height);
  ctx.font = 0.15*height+"px Dancing Script";
  ctx.fillText(content.find("h4").text(), x, y-0.15*height);
}

function update_summerize(target, src=null){
  if(src === null){
    target.html("");
  }else{
    target.html(src.text());
  }

}

function infobubble(canvas, mouseX, mouseY, content, color="#e1eded", bgcolor="#101212"){
  let ctx = canvas.getContext("2d");
  const height = canvas.offsetHeight;

  ctx.font = 0.08*height+"px Quicksand";

  ctx.fillStyle = bgcolor;
  ctx.fillRect(mouseX-3, mouseY+3, ctx.measureText(content).width+3, -0.08*height-3);



  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.font = 0.08*height+"px Quicksand";
  ctx.fillText(content, mouseX, mouseY);
}



$(function(){
  const $work_canvas = $("#works canvas");
  const canvas = $work_canvas.get(0);
  const $works = $("#works .worklist li");
  const $summerize = $("#works .infozone");


  // var active_node = null;
  // var active_node_index = -1;

  var work_network = new Network(canvas, $works.length, 1, 0.1, 0.2, 0.8, 0.6, 0.4, 0, 0.05*canvas.offsetHeight, 0.10*canvas.offsetHeight);
  work_network.fill_node();
  work_network.connect_node();
  work_network.update();
  // setInterval(function(){
  //   work_network.launch_from_node(0);
  // }, 2000);

  $work_canvas.on('mousemove', function(e){
    const rect = work_network.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    work_network.desilluminate();
    let cn_info = work_network.closest_node(mouseX, mouseY);
    let cn_index = cn_info[0];
    let cn = cn_info[1];
    cn.illuminate();
    work_network.clear_canvas();
    work_network.update();

    display_content(canvas, cn_index, cn, $works.eq(cn_index));
    $("#works .line-separator").css("display","block");
    update_summerize($summerize, $works.eq(cn_index).find("a"));
    // infobubble(canvas, mouseX, mouseY, "learn more");
  });

  $work_canvas.on('click', function(e){
    const rect = work_network.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    work_network.desilluminate();
    let cn_info = work_network.closest_node(mouseX, mouseY);
    let cn_index = cn_info[0];
    let cn = cn_info[1];
    document.location.href=$works.eq(cn_index).find("a").attr("href");
  });

  $work_canvas.on('mouseleave', function(e){
    const rect = work_network.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    work_network.desilluminate();
    work_network.clear_canvas();
    work_network.update();
    $("#works .line-separator").css("display","none");
    update_summerize($summerize);
  });

});
