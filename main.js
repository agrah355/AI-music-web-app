rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1="";
song2="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(500,440);
    canvas.center();

    video=createCapture(VIDEO);
    video.size(500,440);
    video.hide()

    poseNet=ml5.poseNet(video, modleLoaded);
    poseNet.on("pose", gotResult);
}
function modleLoaded(){
    console.log('posenet model is inatilaized');
}
function draw(){
    image(video,0,0,500,440);
    song1.isPlaying();
    fill("#000000");
    stroke("#000000");
    if(scoreLeftWrist >0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2==true){
            song2.isPlaying();
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1==true){
            song1.isPlaying();
        }
    }
}
function gotResult(results){
    if(results.length>0){
        console.log(results);
        
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Score left wrist ="+scoreLeftWrist+"Score left wrist ="+scoreRightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wristX is ="+leftWristX+"left wristY is ="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wristX is ="+rightWristX+"left wristY is ="+rightWristY);
    }
}