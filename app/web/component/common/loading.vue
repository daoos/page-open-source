<template>
<div class="modal">
    <div class="wrapper load">
        <div class="line">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    <div class="circle"></div>
     <p style="text-align: center;
    position: relative;
    top: 30px;
    color: #fff;
    font-size: 14px;">正在上传图片，请稍后..</p>
</div>
   
</div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index:9999;
}
.modal .wrapper {
  position: absolute;
  top: 48%;
  left: 50%;
  width: 8.13333rem;
  margin-left: -4.06667rem;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}
.modal .wrapper .content {
  padding: 0.64rem 0.48rem;
  background-color: #fffffc;
  width: 8.13333rem;
  -webkit-border-radius: 0.26667rem;
  -moz-border-radius: 0.26667rem;
  border-radius: 0.26667rem;
}
@-webkit-keyframes load {
  0%,
  20% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.load {
  position: relative;
}
.load .line {
  position: absolute;
  left: 50%;
}
.load .line div {
  position: absolute;
  left: -2px;
  top: -17px;
  width: 3px;
  height: 36px;
}
.load .line div:after,
.load .line div:before {
  content: "";
  display: block;
  height: 50%;
  background-color: #fcfcfc;
  border-radius: 10px;
  -webkit-animation: load 1.2s linear 0s infinite;
  -o-animation: load 1.2s linear 0s infinite;
  animation: load 1.2s linear 0s infinite;
}
.load .line div:nth-child(2) {
  -webkit-transform: rotate(30deg);
  -moz-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  -o-transform: rotate(30deg);
  transform: rotate(30deg);
}
.load .line div:nth-child(3) {
  -webkit-transform: rotate(60deg);
  -moz-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  -o-transform: rotate(60deg);
  transform: rotate(60deg);
}
.load .line div:nth-child(4) {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}
.load .line div:nth-child(5) {
  -webkit-transform: rotate(120deg);
  -moz-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  -o-transform: rotate(120deg);
  transform: rotate(120deg);
}
.load .line div:nth-child(6) {
  -webkit-transform: rotate(150deg);
  -moz-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  -o-transform: rotate(150deg);
  transform: rotate(150deg);
}
.load .line div:nth-child(2):before {
  animation-delay: 0.1s;
}
.load .line div:nth-child(3):before {
  animation-delay: 0.2s;
}
.load .line div:nth-child(4):before {
  animation-delay: 0.3s;
}
.load .line div:nth-child(5):before {
  animation-delay: 0.4s;
}
.load .line div:nth-child(6):before {
  animation-delay: 0.5s;
}
.load .line div:nth-child(1):after {
  animation-delay: 0.6s;
}
.load .line div:nth-child(2):after {
  animation-delay: 0.7s;
}
.load .line div:nth-child(3):after {
  animation-delay: 0.8s;
}
.load .line div:nth-child(4):after {
  animation-delay: 0.9s;
}
.load .line div:nth-child(5):after {
  animation-delay: 1s;
}
.load .line div:nth-child(6):after {
  animation-delay: 1.1s;
}
.load .circle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  margin: -18px 0 0 -9px;
  background: #7b7b7b;
  border-radius: 18px;
}
</style>