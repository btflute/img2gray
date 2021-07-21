<template>
  <div id="app">
    <div>
      <input type="file" accept=".jpeg,.png,jpg" @change="handleClick" >
      <canvas id="canvas" style="display: none;"></canvas>
    </div>
    
    <img :src="imgSrc" >
  </div>
  
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      imgSrc: ''
    }
  },
  methods: {
    handleClick(e) {
      console.log(e.target)
      const file = e.target.files[0]; // 得到图片项
      const reader = new FileReader(); // 创建file blob
      reader.readAsDataURL(file);
      const vue = this
      reader.onload = function (_file) {
        const image = new Image();
        image.src = _file.target.result;
        image.onload = function () {
          vue.imgSrc = vue.gray(image); //最核心的算法，后续着重分析
        };
      };
    },
    gray(imgObj) {
      const width = imgObj.width;
      const height = imgObj.height;
      const canvas = document.querySelector("canvas");
      if (canvas.getContext) {
        const context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        context.drawImage(imgObj, 0, 0); //画一个图
        // 获得隐含区域的像素数据, 返回ImageData 对象，其中的data属性包含了所需的数据
        const imageData = context.getImageData(0, 0, width, height);
        let pixelData = imageData.data;
        //重点来了，逐行遍历上述的像素数组
        for (let h = 0; h < height; h++) {
          for (let w = 0; w < width; w++) {
            const i = h * 4 * width + w * 4; // 获得每个像素值的四个点位的值，最核心
            const avgPixel = (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3; // 最简单的平均值算法
            // 使用平均化的像素点去重新赋值RGB三个值
            pixelData[i] = avgPixel;
            pixelData[i + 1] = avgPixel;
            pixelData[i + 2] = avgPixel;
          }
        }
        // 将重新赋值的像素点重新归位到context中
        context.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
        // 能变成图片的最重要的一步
        return canvas.toDataURL(); //把当前构造的canvas对象变成img可使用的uri
      } else {
        console.error("抱歉，你的浏览器不支持");
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
