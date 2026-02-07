/**
 * HTTP优先级 + 渐进式图片加载示例
 * 
 * 策略:
 * 1. 先加载低质量/缩略图 (高优先级)
 * 2. 后台加载高清图 (低优先级)
 * 3. 高清图加载完成后替换
 */

// ============ 方法1: 使用 Fetch API Priority Hints ============
class ProgressiveImageLoader {
    /**
     * 加载渐进式图片
     * @param {HTMLImageElement} imgElement - 图片元素
     * @param {string} lowQualityUrl - 低质量图片URL
     * @param {string} highQualityUrl - 高清图片URL
     */
    static async loadProgressiveImage(imgElement, lowQualityUrl, highQualityUrl) {
        // 1. 高优先级加载缩略图
        const lowQualityBlob = await fetch(lowQualityUrl, {
            priority: 'high', // HTTP/2 优先级提示
        }).then(res => res.blob());

        imgElement.src = URL.createObjectURL(lowQualityBlob);
        imgElement.classList.add('loading');

        // 2. 低优先级加载高清图
        const highQualityBlob = await fetch(highQualityUrl, {
            priority: 'low', // 降低优先级，避免阻塞关键资源
        }).then(res => res.blob());

        // 3. 创建新图片对象确保完全加载
        const tempImg = new Image();
        tempImg.onload = () => {
            // 淡入效果替换
            imgElement.classList.add('fade-out');
            setTimeout(() => {
                imgElement.src = URL.createObjectURL(highQualityBlob);
                imgElement.classList.remove('loading', 'fade-out');
                imgElement.classList.add('loaded');
            }, 300);
        };
        tempImg.src = URL.createObjectURL(highQualityBlob);
    }
}

// ============ 方法2: 使用 Resource Hints (Link Preload) ============
class ResourceHintLoader {
    /**
     * 使用 <link rel="preload"> 控制优先级
     */
    static preloadImages(images) {
        images.forEach(({ url, priority = 'high' }) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = url;
            link.fetchPriority = priority; // 'high', 'low', 'auto'
            document.head.appendChild(link);
        });
    }

    static async loadImage(imgElement, lowQualityUrl, highQualityUrl) {
        // 预加载缩略图 (高优先级)
        this.preloadImages([
            { url: lowQualityUrl, priority: 'high' },
        ]);

        // 加载缩略图
        imgElement.src = lowQualityUrl;
        imgElement.classList.add('blur-up');

        // 等待缩略图加载完成后，再预加载高清图
        await new Promise(resolve => {
            if (imgElement.complete) {
                resolve();
            } else {
                imgElement.addEventListener('load', resolve, { once: true });
            }
        });

        // 预加载高清图 (低优先级)
        this.preloadImages([
            { url: highQualityUrl, priority: 'low' },
        ]);

        // 加载高清图
        const hdImg = new Image();
        hdImg.onload = () => {
            imgElement.src = highQualityUrl;
            imgElement.classList.remove('blur-up');
            imgElement.classList.add('sharp');
        };
        hdImg.src = highQualityUrl;
    }
}

// ============ 方法3: 使用 Intersection Observer + Priority ============
class LazyProgressiveLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.01,
            ...options,
        };
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );
    }

    observe(imgElement) {
        // 从 data-* 属性读取图片URL
        const lowQualityUrl = imgElement.dataset.lowsrc;
        const highQualityUrl = imgElement.dataset.src;

        if (!lowQualityUrl || !highQualityUrl) {
            console.warn('缺少 data-lowsrc 或 data-src 属性');
            return;
        }

        imgElement.dataset.lowQualityUrl = lowQualityUrl;
        imgElement.dataset.highQualityUrl = highQualityUrl;
        this.observer.observe(imgElement);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                this.loadProgressively(img);
                this.observer.unobserve(img);
            }
        });
    }

    async loadProgressively(imgElement) {
        const lowQualityUrl = imgElement.dataset.lowQualityUrl;
        const highQualityUrl = imgElement.dataset.highQualityUrl;

        try {
            // 先加载低质量图片 (高优先级)
            const lowRes = await fetch(lowQualityUrl, { priority: 'high' });
            const lowBlob = await lowRes.blob();
            imgElement.src = URL.createObjectURL(lowBlob);
            imgElement.classList.add('loaded-low');

            // 延迟加载高清图 (低优先级，避免阻塞其他资源)
            requestIdleCallback(async () => {
                const highRes = await fetch(highQualityUrl, { priority: 'low' });
                const highBlob = await highRes.blob();

                const tempImg = new Image();
                tempImg.onload = () => {
                    imgElement.src = URL.createObjectURL(highBlob);
                    imgElement.classList.remove('loaded-low');
                    imgElement.classList.add('loaded-high');
                };
                tempImg.src = URL.createObjectURL(highBlob);
            });
        } catch (error) {
            console.error('图片加载失败:', error);
        }
    }
}

// ============ 方法4: 使用 Service Worker 控制缓存优先级 ============
class ServiceWorkerPriorityLoader {
    static async register() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register(
                    '/sw-priority.js'
                );
                console.log('Service Worker 注册成功:', registration);
            } catch (error) {
                console.error('Service Worker 注册失败:', error);
            }
        }
    }

    // Service Worker 代码示例 (需要在 sw-priority.js 中实现)
    static getServiceWorkerCode() {
        return `
// sw-priority.js
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 检测是否是图片请求
  if (/\\.(jpg|jpeg|png|webp|gif)$/i.test(url.pathname)) {
    // 缩略图 (包含 -thumb 或 -low)
    if (url.pathname.includes('-thumb') || url.pathname.includes('-low')) {
      event.respondWith(
        fetch(event.request, {
          priority: 'high', // 高优先级
        }).then(response => {
          // 缓存缩略图以便快速展示
          const cache = caches.open('thumbnails-v1');
          cache.then(c => c.put(event.request, response.clone()));
          return response;
        })
      );
    } 
    // 高清图
    else {
      event.respondWith(
        fetch(event.request, {
          priority: 'low', // 低优先级
        }).then(response => {
          // 缓存高清图
          const cache = caches.open('high-quality-v1');
          cache.then(c => c.put(event.request, response.clone()));
          return response;
        })
      );
    }
  }
});
    `.trim();
    }
}

// ============ 方法5: 使用 HTTP/2 Server Push (需要服务器配置) ============
/**
 * 服务器端配置示例 (Node.js + HTTP/2)
 * 
 * const http2 = require('http2');
 * const fs = require('fs');
 * 
 * const server = http2.createSecureServer({
 *   key: fs.readFileSync('server-key.pem'),
 *   cert: fs.readFileSync('server-cert.pem')
 * });
 * 
 * server.on('stream', (stream, headers) => {
 *   if (headers[':path'] === '/page.html') {
 *     // 推送缩略图 (高优先级)
 *     stream.pushStream({ ':path': '/images/photo-thumb.jpg' }, (err, pushStream) => {
 *       pushStream.respondWithFile('./images/photo-thumb.jpg', {
 *         'content-type': 'image/jpeg',
 *         ':status': 200,
 *       }, {
 *         weight: 256, // 高权重 (0-256, 越大优先级越高)
 *       });
 *     });
 * 
 *     // 推送高清图 (低优先级)
 *     stream.pushStream({ ':path': '/images/photo-hd.jpg' }, (err, pushStream) => {
 *       pushStream.respondWithFile('./images/photo-hd.jpg', {
 *         'content-type': 'image/jpeg',
 *         ':status': 200,
 *       }, {
 *         weight: 16, // 低权重
 *       });
 *     });
 * 
 *     stream.respondWithFile('./page.html');
 *   }
 * });
 */

// ============ 实际使用示例 ============
// HTML 示例
const htmlExample = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>渐进式图片加载</title>
  <style>
    .progressive-image {
      width: 100%;
      max-width: 800px;
      height: auto;
      transition: filter 0.3s, opacity 0.3s;
    }
    
    .progressive-image.loading {
      filter: blur(10px);
      transform: scale(1.05);
    }
    
    .progressive-image.loaded {
      filter: blur(0);
      transform: scale(1);
    }
    
    .progressive-image.blur-up {
      filter: blur(20px);
      transform: scale(1.1);
    }
    
    .progressive-image.sharp {
      filter: blur(0);
      transform: scale(1);
    }
    
    .progressive-image.fade-out {
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <!-- 方法1: 基础用法 -->
  <img class="progressive-image" id="img1" alt="示例图片1">
  
  <!-- 方法2: 使用 fetchpriority 属性 (原生HTML支持) -->
  <img 
    src="/images/photo-thumb.jpg" 
    data-hd="/images/photo-hd.jpg"
    fetchpriority="high"
    class="progressive-image"
    alt="示例图片2"
  >
  
  <!-- 方法3: 懒加载 + 渐进式 -->
  <img 
    data-lowsrc="/images/photo-thumb.jpg"
    data-src="/images/photo-hd.jpg"
    class="progressive-image lazy"
    alt="示例图片3"
  >
  
  <script src="HTTP2Priority.js"></script>
  <script>
    // 使用方法1
    const img1 = document.getElementById('img1');
    ProgressiveImageLoader.loadProgressiveImage(
      img1,
      '/images/photo-thumb.jpg',
      '/images/photo-hd.jpg'
    );
    
    // 使用方法3 - 懒加载
    const lazyLoader = new LazyProgressiveLoader();
    document.querySelectorAll('.lazy').forEach(img => {
      lazyLoader.observe(img);
    });
  </script>
</body>
</html>
`;

// ============ 最佳实践建议 ============
const bestPractices = {
    tips: [
        '1. 缩略图应该是高清图的1/10大小或更小',
        '2. 使用 WebP 格式可以大幅减小文件大小',
        '3. 考虑使用 LQIP (Low Quality Image Placeholder) 技术',
        '4. 使用 BlurHash 或 ThumbHash 生成占位符',
        '5. 结合 CDN 和响应式图片 (srcset)',
        '6. 使用 loading="lazy" 属性进行原生懒加载',
        '7. HTTP/2 多路复用可以并行传输多个资源',
        '8. 使用 Chrome DevTools 的 Network 面板查看优先级',
    ],

    imageOptimization: {
        thumbnail: {
            width: 50, // 或原图的10%
            quality: 20,
            format: 'webp',
            blur: true,
        },
        highQuality: {
            width: 'original',
            quality: 85,
            format: 'webp',
        },
    },

    // 优先级值说明
    priorityLevels: {
        high: '用于 LCP (Largest Contentful Paint) 图片',
        low: '用于首屏外或次要图片',
        auto: '浏览器自动决定',
    },
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProgressiveImageLoader,
        ResourceHintLoader,
        LazyProgressiveLoader,
        ServiceWorkerPriorityLoader,
        bestPractices,
    };
}
