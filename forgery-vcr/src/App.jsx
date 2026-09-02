import React, { useState, useRef, useEffect } from 'react';
import { FileText, Github, Youtube, MoveHorizontal, ChevronRight, ChevronLeft, Check, X, ArrowLeft, ExternalLink, Play, Box, ArrowUp } from 'lucide-react';

// 添加 Academicons 字体和动画样式
const styles = `
  @import url('https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css');
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s ease-out forwards;
  }
`;

// --- 组件：图片对比滑块 (Image Comparison Slider) ---
// 这是复刻 "Token Playground" 核心效果的组件
const CompareSlider = ({ leftImage, rightImage, leftLabel, rightLabel, isZoom = false }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  // 支持触摸屏
  const handleTouchMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (isDragging) handleMove(e);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 select-none group"
         ref={containerRef}
         onTouchMove={handleTouchMove}
         style={{ aspectRatio: 'auto' }}>
      
      {/* 底层图片 (Right Image / Original) */}
      <img src={rightImage} alt="Original" className="w-full h-auto object-cover" draggable="false" />
      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm z-10 pointer-events-none">
        {rightLabel}
      </div>

      {/* 顶层图片 (Left Image / Processed) - 使用 clip-path 裁剪 */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={leftImage} 
          alt="Processed" 
          className={`w-full h-full ${isZoom ? 'object-contain' : 'object-cover'}`}
          draggable="false" 
        />
        <div className="absolute top-4 left-4 bg-orange-500/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm z-10 pointer-events-none">
          {leftLabel}
        </div>
      </div>

      {/* 滑块手柄 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400">
           <MoveHorizontal size={16} />
        </div>
      </div>
    </div>
  );
};

// --- 组件：特殊的文本标签 (Token Tags) ---
const TokenTag = ({ type, children }) => {
  const styles = {
    think: "bg-blue-100 text-blue-700 border-blue-200",
    segment: "bg-red-100 text-red-700 border-red-200",
    depth: "bg-blue-100 text-blue-700 border-blue-200",
    edge: "bg-gray-100 text-gray-700 border-gray-200",
    answer: "bg-green-100 text-green-700 border-green-200",
  };
  
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 mx-1 rounded text-xs font-mono font-bold border ${styles[type] || styles.think} align-middle`}>
      &lt;{type === 'think' ? 'Think' : type === 'answer' ? 'Answer' : `${type.toUpperCase()} Token`}&gt;
      {children}
    </span>
  );
};

// --- 组件：Multiple CoVT Tokens Visualization (完全复刻设计) ---
const MultipleCoVTDemo = () => {
  const [activeDemo, setActiveDemo] = useState(1);
  const [activeToken, setActiveToken] = useState('ELA');
  const [clickedImage, setClickedImage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const demos = [
    {
      id: 1,
      originalImage: './pics/demo1_ori.png',
      question: "Perform a forgery detection. Classify the image as real or fake, and if tampered, output the coordinates of the bounding boxes.",
      toolCalls: [
        { name: 'ELA', image: './pics/demo1_ela.png', args: null },
        { name: 'FFT', image: './pics/demo1_fft.png', args: null },
        { name: 'NPP', image: './pics/demo1_npp.png', args: null }
      ],
      answer: 'fake, <|box_start|>(193,144),(627,646)<|box_end|>',
      playgroundTools: [
        { leftImage: './pics/demo1_ela.png', rightImage: './pics/demo1_ori.png', leftLabel: 'ELA', rightLabel: 'ORIGINAL' },
        { leftImage: './pics/demo1_fft.png', rightImage: './pics/demo1_ori.png', leftLabel: 'FFT', rightLabel: 'ORIGINAL' },
        { leftImage: './pics/demo1_npp.png', rightImage: './pics/demo1_ori.png', leftLabel: 'NPP', rightLabel: 'ORIGINAL' }
      ]
    },
    {
      id: 2,
      originalImage: './pics/demo2_ori.png',
      question: "Please analyze whether this image is real or fake. If it's not authentic, show me the bounding boxes of the tampered zones.",
      toolCalls: [
        { name: 'ELA', image: './pics/demo2_ela.png', args: null },
        { name: 'FFT', image: './pics/demo2_fft.png', args: null },
        { name: 'Zoom-In', image: './pics/demo2_zoom.png', args: '[169, 225, 624, 472]' }
      ],
      answer: 'fake, <|box_start|>(756,379),(838,688)<|box_end|>',
      playgroundTools: [
        { leftImage: './pics/demo2_ela.png', rightImage: './pics/demo2_ori.png', leftLabel: 'ELA', rightLabel: 'ORIGINAL' },
        { leftImage: './pics/demo2_fft.png', rightImage: './pics/demo2_ori.png', leftLabel: 'FFT', rightLabel: 'ORIGINAL' },
        { leftImage: './pics/demo2_zoom.png', rightImage: './pics/demo2_ori.png', leftLabel: 'Zoom-In', rightLabel: 'ORIGINAL', isZoom: true }
      ]
    },
    {
      id: 3,
      originalImage: './pics/demo3_ori.png',
      question: "What is the status of this image, real or fake? If you detect manipulation, please provide the bounding boxes.",
      toolCalls: [
        { name: 'Zoom-In', image: './pics/demo3_zoom1.png', args: '[150, 383, 274, 543]' },
        { name: 'Zoom-In', image: './pics/demo3_zoom2.png', args: '[40, 356, 91, 631]' },
        { name: 'Zoom-In', image: './pics/demo3_zoom3.png', args: '[58, 456, 89, 531]' }
      ],
      answer: 'fake, <|box_start|>(50,383),(74,443)<|box_end|>',
      playgroundTools: [
        { leftImage: './pics/demo3_zoom1.png', rightImage: './pics/demo3_ori.png', leftLabel: 'Zoom-In 1', rightLabel: 'ORIGINAL', isZoom: true },
        { leftImage: './pics/demo3_zoom2.png', rightImage: './pics/demo3_ori.png', leftLabel: 'Zoom-In 2', rightLabel: 'ORIGINAL', isZoom: true },
        { leftImage: './pics/demo3_zoom3.png', rightImage: './pics/demo3_ori.png', leftLabel: 'Zoom-In 3', rightLabel: 'ORIGINAL', isZoom: true }
      ]
    }
  ];

  const currentDemo = demos.find(d => d.id === activeDemo);

  // 处理 demo 切换时的动画
  const handleDemoChange = (demoId) => {
    if (demoId !== activeDemo) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveDemo(demoId);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="w-full">
      {/* 副标题 */}
      <p className="text-center text-slate-500 mb-8">
        ForgeryVCR employs forensic tools (ELA, FFT, NPP, Zoom-In) to materialize imperceptible tampering traces into explicit visual evidence.
      </p>

      {/* Demo 选择按钮 */}
      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleDemoChange(num)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeDemo === num
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-white shadow-lg'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Demo {num}
          </button>
        ))}
      </div>

      {/* 主内容区域 */}
      <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
        {/* 提示文字 */}
        <div className="text-center mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border-l-4 border-cyan-400">
          <p className="text-slate-700">
            Click <span className="inline-flex items-center px-2 py-0.5 mx-1 rounded text-sm font-mono font-bold bg-cyan-100 text-cyan-700 border border-cyan-200">&lt;image&gt;</span> tags in the ANSWER section to view the corresponding forensic tool visualizations.
          </p>
        </div>

        {/* 上方区域：左侧原图 + 右侧 QUESTION */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 items-center transition-all duration-500 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          {/* 左侧：原图 (缩小) */}
          <div className="flex items-center justify-center">
            <img 
              src={currentDemo.originalImage} 
              alt="Original Image" 
              className="w-full max-w-xs h-auto rounded-xl shadow-md"
            />
          </div>

          {/* 右侧：QUESTION (独立白色框，自适应高度) */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-blue-600 mb-4 uppercase tracking-wide">Question</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                {currentDemo.question}
              </p>
            </div>
          </div>
        </div>

        {/* 下方区域：ANSWER */}
        <div className={`bg-white rounded-xl p-6 shadow-md border border-gray-200 transition-all duration-500 delay-100 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h3 className="text-xl font-bold text-orange-600 mb-4 uppercase tracking-wide">Answer</h3>
          
          <div className="space-y-2 font-mono text-base">
            {currentDemo.toolCalls.map((tool, idx) => (
              <div key={idx} className="space-y-1">
                {/* tool_call - 不换行 */}
                <div className="text-slate-900">
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">&lt;tool_call&gt;</span>
                  <span className="ml-2">{"{"}</span>
                  <span>"name"</span>: 
                  <span>"{tool.name}"</span>
                  {tool.args && (
                    <>
                      <span>, </span>
                      <span>"arguments"</span>: 
                      <span>{`{${tool.args}}`}</span>
                    </>
                  )}
                  <span>{"}"}</span>
                  <span className="inline-block px-2 py-0.5 ml-1 rounded bg-amber-100 text-amber-800 font-bold">&lt;/tool_call&gt;</span>
                </div>
                
                {/* tool_response - 不换行 */}
                <div className="text-slate-900">
                  <span className="inline-block px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-bold">&lt;tool_response&gt;</span>
                  <span className="ml-2">{"{"}</span>
                  <span>"status"</span>: 
                  <span>"success"</span>, 
                  <span>"tool_image"</span>: "
                  <span 
                    className="relative inline-block cursor-pointer transition-colors"
                    onClick={() => setClickedImage(clickedImage === tool.image ? null : tool.image)}
                  >
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-cyan-100 text-cyan-700 border border-cyan-200 font-bold hover:bg-cyan-200">
                      &lt;image&gt;
                    </span>
                    {clickedImage === tool.image && (
                      <>
                        {/* 透明背景层，点击关闭 */}
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setClickedImage(null);
                          }}
                        />
                        {/* 图片弹出框 - 模仿 CoVT 设计 */}
                        <div 
                          className="absolute z-50 left-1/2 bottom-full mb-3 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-slideUp" 
                          style={{ width: '240px' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img 
                            src={tool.image} 
                            alt={`${tool.name} visualization`} 
                            className="w-full h-auto rounded-lg"
                          />
                          {/* 菱形箭头 */}
                          <div 
                            className="absolute left-1/2 -bottom-2 w-4 h-4 bg-white border-b border-r border-gray-200 transform -translate-x-1/2 rotate-45"
                            style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                          />
                        </div>
                      </>
                    )}
                  </span>
                  "<span>{"}"}</span>
                  <span className="inline-block px-2 py-0.5 ml-1 rounded bg-orange-100 text-orange-700 font-bold">&lt;/tool_response&gt;</span>
                </div>
              </div>
            ))}
            
            {/* Final answer - 不换行 */}
            <div className="mt-3 pt-3 border-t border-slate-200">
              <div className="text-slate-900">
                <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold">&lt;answer&gt;</span>
                <span className="ml-2">{currentDemo.answer}</span>
                <span className="inline-block px-2 py-0.5 ml-2 rounded bg-green-100 text-green-700 font-bold">&lt;/answer&gt;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Map Playground - 在白色圆角矩形块内 */}
        <div className={`mt-8 bg-white rounded-xl p-8 shadow-md border border-gray-200 transition-all duration-500 delay-200 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h3 className="text-2xl font-bold text-center mb-3 text-slate-900">Tool Map Playground</h3>
          <p className="text-center text-slate-500 mb-8">
            Drag the slider to view the decoded visualization results.
          </p>
          
          <div className={`grid grid-cols-1 gap-8 ${
            currentDemo.playgroundTools.length === 2 ? 'md:grid-cols-2' : 
            currentDemo.playgroundTools.length === 3 ? 'md:grid-cols-3' : 
            'md:grid-cols-2'
          }`}>
            {currentDemo.playgroundTools.map((tool, idx) => (
              <div key={idx}>
                <CompareSlider
                  leftImage={tool.leftImage}
                  rightImage={tool.rightImage}
                  leftLabel={tool.leftLabel}
                  rightLabel={tool.rightLabel}
                  isZoom={tool.isZoom}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 主页面组件 ---
export default function ForgeryVCRPage() {
  const [activeSection, setActiveSection] = useState('abstract');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 监听滚动，判断是否显示回到顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      const abstractSection = document.getElementById('abstract');
      if (abstractSection) {
        const abstractTop = abstractSection.offsetTop;
        setShowScrollTop(window.scrollY >= abstractTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动到指定区域
  const smoothScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveSection(sectionId);
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setSidebarOpen(false);
    }
  };

  // 回到顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="project-page min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 relative overflow-x-hidden">
      {/* 添加动画样式 */}
      <style>{styles}</style>
      
      {/* Toggle button - Fixed position, always visible */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="floating-nav-toggle fixed left-6 top-24 z-50 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 text-white hover:scale-110 shadow-lg transition-all duration-300"
        aria-label={sidebarOpen ? 'Close section navigation' : 'Open section navigation'}
        aria-expanded={sidebarOpen}
      >
        <ChevronLeft 
          size={24} 
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: sidebarOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
          }}
        />
      </button>

      {/* Sidebar Navigation - Below the button */}
      <aside className={`floating-sidebar fixed left-6 z-40 hidden lg:block transition-all duration-500 overflow-hidden ${
        sidebarOpen ? 'top-40 opacity-100' : 'top-24 opacity-0 pointer-events-none'
      }`}
      style={{ 
        height: sidebarOpen ? 'calc(100vh - 12rem)' : '0',
        maxHeight: 'calc(100vh - 12rem)'
      }}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full overflow-y-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-4">ForgeryVCR</h3>
          <nav className="space-y-2">
            <a 
              href="#abstract" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('abstract');
              }}
              className={`block py-2 px-3 rounded transition-colors cursor-pointer ${
                activeSection === 'abstract' 
                  ? 'font-bold text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Abstract
            </a>
            <a 
              href="#method" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('method');
              }}
              className={`block py-2 px-3 rounded transition-colors cursor-pointer ${
                activeSection === 'method' 
                  ? 'font-bold text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Methodology
            </a>
            <a 
              href="#experiments" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('experiments');
              }}
              className={`block py-2 px-3 rounded transition-colors cursor-pointer ${
                activeSection === 'experiments' 
                  ? 'font-bold text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Experiments
            </a>
            <a 
              href="#analysis" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('analysis');
              }}
              className={`block py-2 px-3 rounded transition-colors cursor-pointer ${
                activeSection === 'analysis' 
                  ? 'font-bold text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Analysis
            </a>
            <a 
              href="#visualization" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('visualization');
              }}
              className={`block py-2 px-3 rounded transition-colors cursor-pointer ${
                activeSection === 'visualization' 
                  ? 'font-bold text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Visualization
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content - Full width, not affected by sidebar */}
      <div>
      
      {/* 1. Header / Title Section */}
      <header className="hero pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 text-center max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="hero-title text-[clamp(2rem,8.5vw,3rem)] md:text-4xl lg:text-5xl leading-[1.08] sm:leading-tight font-extrabold tracking-tight mb-6 text-slate-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
          ForgeryVCR
          </span>
          <span>: Visual-Centric Reasoning via Efficient Forensic Tools in MLLMs for Image Forgery Detection and Localization</span>
        </h1>

        {/* Author List */}
        <div className="author-list flex flex-col items-center mb-4 text-sm sm:text-base md:text-lg leading-relaxed text-slate-900 font-bold">
          {/* First Row */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-1 sm:mb-2 max-w-5xl">
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Youqi Wang<sup>1,2*†</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Shen Chen<sup>2*♠</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Haowei Wang<sup>2</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Rongxuan Peng<sup>1</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Taiping Yao<sup>2</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Shunquan Tan<sup>1<span className="text-gray-400 inline-block" style={{ transform: 'scale(1.2) translateY(-0.05em)', verticalAlign: 'baseline', marginLeft: '0.1em' }}>✉</span></sup></span>
          </div>
          {/* Second Row */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Changsheng Chen<sup>1</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Bin Li<sup>1</sup></span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors whitespace-nowrap">Shouhong Ding<sup>2<span className="text-gray-400 inline-block" style={{ transform: 'scale(1.2) translateY(-0.05em)', verticalAlign: 'baseline', marginLeft: '0.1em' }}>✉</span></sup></span>
          </div>
        </div>
        <div className="text-sm text-slate-500 mb-2">
          <div><sup>1</sup>Shenzhen University</div>
          <div><sup>2</sup>Tencent Youtu Lab</div>
        </div>
        <div className="text-xs leading-relaxed text-slate-400 mb-8 sm:mb-10">
          <div><sup>*</sup>Equal contribution. <sup>♠</sup>Project Leader. <sup><span className="text-gray-400 inline-block" style={{ transform: 'scale(1.2) translateY(-0.05em)', verticalAlign: 'baseline', marginLeft: '0.1em' }}>✉</span></sup>Corresponding author. <sup>†</sup>Work done during internship at Tencent Youtu Lab.</div>
        </div>

        {/* Action Buttons */}
        <div className="hero-actions flex flex-wrap justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <a
            href="https://arxiv.org/abs/2602.14098"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center px-5 sm:px-6 py-3 bg-slate-800 text-white rounded-full font-semibold transition-all shadow-lg hover:bg-slate-700 hover:-translate-y-0.5 active:translate-y-0 group"
            aria-label="Read the ForgeryVCR paper on arXiv"
          >
            {/* Academicons arXiv 图标 */}
            <i className="ai ai-arxiv mr-2" style={{ fontSize: '20px' }}></i>
            arXiv
          </a>
          <a
            href="https://github.com/youqiwong/ForgeryVCR"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center px-5 sm:px-6 py-3 bg-slate-800 text-white rounded-full font-semibold transition-all shadow-lg hover:bg-slate-700 hover:-translate-y-0.5 active:translate-y-0 group"
            aria-label="View the ForgeryVCR code on GitHub"
          >
            {/* GitHub icon from Simple Icons */}
            <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            Code
          </a>
          <a
            href="https://huggingface.co/spaces/youqiwong/ForgeryVCR-Demo"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center px-5 sm:px-6 py-3 bg-slate-800 text-white rounded-full font-semibold transition-all shadow-lg hover:bg-slate-700 hover:-translate-y-0.5 active:translate-y-0 group"
            aria-label="Try the ForgeryVCR demo on Hugging Face"
          >
            <Play size={18} className="mr-2" />
            Demo
          </a>
          <a
            href="https://huggingface.co/youqiwong/ForgeryVCR"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center px-5 sm:px-6 py-3 bg-slate-800 text-white rounded-full font-semibold transition-all shadow-lg hover:bg-slate-700 hover:-translate-y-0.5 active:translate-y-0 group"
            aria-label="View the ForgeryVCR model on Hugging Face"
          >
            <Box size={18} className="mr-2" />
            Model
          </a>
        </div>
      </header>

      {/* Figure with hover effect */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="flex flex-col items-center p-4">
          <div className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl rounded-lg">
            <img 
              src="./pics/fig1_comic.svg" 
              alt="ForgeryVCR Framework Diagram"
              className="w-full max-w-3xl rounded-lg"
            />
          </div>
          <div className="mt-4 bg-white rounded-lg p-6 max-w-3xl" style={{ boxShadow: '0 -4px 15px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.05), 0 8px 15px -5px rgba(0, 0, 0, 0.05), 0 -8px 15px -5px rgba(0, 0, 0, 0.05)' }}>
            <p className="text-justify text-sm text-slate-600">
              <strong>Motivation.</strong> Unlike semantically biased methods, ForgeryVCR employs <strong>Visual-Centric Reasoning</strong>, grounding the verdict in visual evidence rather than vague descriptions.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Abstract */}
      <section id="abstract" className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 text-center">Abstract</h1>
        <div className="bg-white rounded-lg p-5 sm:p-8" style={{ boxShadow: '0 -4px 15px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.05), 0 8px 15px -5px rgba(0, 0, 0, 0.05), 0 -8px 15px -5px rgba(0, 0, 0, 0.05)' }}>
        <p className="text-base sm:text-lg leading-relaxed text-slate-600 text-left sm:text-justify">
            Existing Multimodal Large Language Models (MLLMs) for image forgery detection and localization predominantly operate under a text-centric Chain-of-Thought (CoT) paradigm. However, forcing these models to textually characterize imperceptible low-level tampering traces inevitably leads to hallucinations, as linguistic modalities are insufficient to capture such fine-grained pixel-level inconsistencies. To overcome this, we propose <strong>ForgeryVCR</strong>, a framework that incorporates a forensic toolbox to materialize imperceptible traces into explicit visual intermediates via Visual-Centric Reasoning. To enable efficient tool utilization, we introduce a Strategic Tool Learning post-training paradigm, encompassing gain-driven trajectory construction for Supervised Fine-Tuning (SFT) and subsequent Reinforcement Learning (RL) optimization guided by a tool utility reward. This paradigm empowers the MLLM to act as a proactive decision-maker, learning to spontaneously invoke multi-view reasoning paths including local zoom-in for fine-grained inspection and the analysis of invisible inconsistencies in compression history, noise residuals, and frequency domains. Extensive experiments reveal that ForgeryVCR achieves state-of-the-art (SOTA) performance in both detection and localization tasks, demonstrating superior generalization and robustness with minimal tool redundancy. The code is available at https://github.com/youqiwong/ForgeryVCR.
          </p>
        </div>
      </section>

      {/* 2. Methodology */}
      <section id="method" className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 text-center">Methodology</h1>
        
        <h2 className="text-2xl font-bold mb-8 text-slate-900 text-center">ForgeryVCR: Visual-Centric Reasoning Framework</h2>

        {/* Part 1: Strategic Tool Learning Pipeline (Figure 2) */}
        <div className="mb-12">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="./pics/fig2_comic.png" 
              alt="ForgeryVCR Framework Overview"
              className="w-full max-w-4xl rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-auto mb-6" style={{ boxShadow: '0 -4px 15px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.05), 0 8px 15px -5px rgba(0, 0, 0, 0.05), 0 -8px 15px -5px rgba(0, 0, 0, 0.05)' }}>
            <p className="text-justify text-sm text-slate-600">
              <strong>Overview of the ForgeryVCR Framework.</strong> The top panel depicts the architecture. The training pipeline: (1) Stage 1 uses Gain-Driven Tool Selection and Multi-Trajectories Synthesis to construct diverse reasoning paths; (2) Stage 2 optimizes the policy via GRPO with Tool-Utility Reward to foster strategic tool usage. The right panel shows the reasoning chain invoking tools to expose subtle artifacts for precise localization, guiding SAM2 to generate the fine-grained mask.
            </p>
          </div>
        </div>

        {/* Part 2: Visual-Centric Trajectory Construction (Figure 3) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 text-center">Gain-Driven Trajectory Synthesis</h2>
          
          <div className="flex flex-col items-center mb-6">
            <img 
              src="./pics/fig3_comic.png" 
              alt="Visual-Centric Trajectory Construction"
              className="w-full max-w-4xl rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-auto mb-6" style={{ boxShadow: '0 -4px 15px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.05), 0 8px 15px -5px rgba(0, 0, 0, 0.05), 0 -8px 15px -5px rgba(0, 0, 0, 0.05)' }}>
            <p className="text-justify text-sm text-slate-600">
              <strong>Pipeline of Visual-Centric Trajectory Construction.</strong> The pipeline rigorously filters effective tools and generates diverse reasoning paths through Gain-Driven Tool Selection and Multi-Trajectories Synthesis. Three trajectory types are constructed: (1) Forensic Analysis Trajectories utilizing FFT, ELA, and NPP tools; (2) Visual Refinement Trajectories incorporating Zoom-In operations; (3) Iterative Hybrid Trajectories combining both approaches.
            </p>
          </div>

          {/* Figure 4: Multi-Trajectories Examples */}
          <div className="flex flex-col items-center mb-6">
            <img 
              src="./pics/fig4_multivcot.png" 
              alt="Multi-Trajectories Examples"
              className="w-full max-w-4xl rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-auto" style={{ boxShadow: '0 -4px 15px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.05), 0 8px 15px -5px rgba(0, 0, 0, 0.05), 0 -8px 15px -5px rgba(0, 0, 0, 0.05)' }}>
            <p className="text-justify text-sm text-slate-600">
              <strong>Examples of Multi-Trajectories.</strong> Three trajectory types are demonstrated: (a) <strong>Forensic Analysis Trajectory</strong> sequentially invokes forensic tools (ELA, FFT, NPP) to expose statistical inconsistencies; (b) <strong>Visual Refinement Trajectory</strong> incorporates multiple Zoom-In operations for fine-grained local inspection; (c) <strong>Iterative Hybrid Trajectory</strong> combines both forensic analysis and visual refinement in an alternating manner to achieve comprehensive verification.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Experiments */}
      <section id="experiments" className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 text-center">Experiments</h1>
        
        {/* Detection Performance Table */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="./pics/table1.png" 
              alt="Detection Performance Comparison"
              className="w-full rounded-lg"
            />
          </div>

          {/* Box 1: Image-level Forgery Detection */}
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              State-of-the-Art Detection Performance
            </h3>
            <ul className="space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Best Weighted Performance:</strong> Achieves the highest weighted average F1-score of 0.7985 and Accuracy of 0.8237 across all benchmarks.</li>
              <li><strong>Consistent Generalization:</strong> Delivers the best F1-score on six of nine benchmarks.</li>
              <li><strong>Visual-Centric Advantage:</strong> Grounds predictions in visual forensic evidence, mitigating semantic hallucinations caused by text-centric reasoning.</li>
            </ul>
          </div>
        </div>

        {/* Localization Performance Table */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="./pics/table2.png" 
              alt="Localization Performance Comparison"
              className="w-full rounded-lg"
            />
          </div>

          {/* Box 2: Pixel-level Forgery Localization */}
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-500">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              State-of-the-Art Localization Performance
            </h3>
            <ul className="space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Region-Level Grounding:</strong> Achieves the best weighted B-IoU (BBox-IoU) of 0.3386, measuring region-level bounding-box overlap.</li>
              <li><strong>Pixel-Level Localization:</strong> Achieves the best weighted P-IoU of 0.3380, where P-IoU measures overlap between the predicted and ground-truth masks.</li>
              <li><strong>Consistent Localization:</strong> Leads both B-IoU and P-IoU on the weighted average while maintaining strong results across diverse datasets and manipulation types.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Analysis */}
      <section id="analysis" className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 text-center">Analysis</h1>
        
        {/* Training Dynamics and Tool Usage - Side by Side */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Training Dynamics */}
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-shrink-0">
                <img 
                  src="./pics/fig5_trainingdynamics.png" 
                  alt="Training Dynamics"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-500 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">📈</span>
                  Training Dynamics
                </h3>
                <ul className="space-y-2 text-slate-600 leading-relaxed flex-grow">
                  <li><strong>Adaptive Evolution:</strong> The steady rise in rewards contrasts with decreased interaction turns, indicating the model evolves from random exploration to strategic execution.</li>
                  <li><strong>Efficiency-Precision Balance:</strong> The model learns selectivity, invoking forensic tools only when necessary to maximize detection accuracy while eliminating redundant inference steps.</li>
                </ul>
              </div>
            </div>

            {/* Tool Usage */}
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-shrink-0 mt-1.5">
                <img 
                  src="./pics/fig6_SFT_RL_notools.png" 
                  alt="Tool Usage"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🛠️</span>
                  Tool Usage
                </h3>
                <ul className="space-y-2 text-slate-600 leading-relaxed flex-grow">
                  <li><strong>Suppression of Redundancy:</strong> Unlike the SFT stage which tends to use tools indiscriminately, the RL stage effectively filters out non-informative invocations.</li>
                  <li><strong>Dynamic Investigation:</strong> The model shifts from mechanical execution to a dynamic policy, learning to autonomously bypass tools and rely on direct visual assessment when sufficient.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Evolution Visualization */}
        <div className="mb-12">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="./pics/fig7_comic.png" 
              alt="Policy Evolution from SFT to RL"
              className="w-full max-w-4xl rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-auto" style={{ boxShadow: '0 -4px 15px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.05), 0 8px 15px -5px rgba(0, 0, 0, 0.05), 0 -8px 15px -5px rgba(0, 0, 0, 0.05)' }}>
            <p className="text-justify text-sm text-slate-600">
              <strong>Qualitative comparison of policy evolution from Cold Start (SFT) to RL Optimization.</strong> The three columns illustrate distinct improvement behaviors: <strong>(Left)</strong> correcting ineffective tool selection (switching from ELA to FFT) to fix false negatives; <strong>(Middle)</strong> pruning redundant tools (removing NPP) to eliminate noise and improve efficiency; and <strong>(Right)</strong> refining spatial grounding to maximize localization precision using the same forensic cues.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Visualization */}
      <section id="visualization" className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <h1 className="text-4xl font-bold mb-12 text-slate-900 text-center">Visualization</h1>
        
        {/* 5.1 Visual-Centric Reasoning Visualization */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Visual-Centric Reasoning Visualization</h2>
          <MultipleCoVTDemo />
        </div>

        {/* 5.2 Forgery Localization Mask Visualization */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Forgery Localization Mask Visualization</h2>
          
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed text-center">
              We present a <span className="font-semibold text-blue-600">qualitative comparison of pixel-level localization masks</span> across benchmark datasets. 
              ForgeryVCR is compared with representative baselines including specialist networks and forensic-tuned MLLMs. 
              Our method consistently produces <span className="font-semibold">high-fidelity masks</span> that closely align with the Ground Truth (GT), 
              effectively suppressing background noise and accurately delineating manipulation boundaries, 
              even in datasets with complex editing and diverse manipulations.
            </p>

            <div className="flex flex-col items-center">
              <img 
                src="./pics/fig11_allmasks.png" 
                alt="Qualitative comparison of pixel-level localization masks"
                className="w-full max-w-5xl rounded-lg shadow-lg"
              />
              <p className="text-justify text-sm text-slate-600 max-w-5xl mt-4">
                <span className="font-semibold">Qualitative comparison of pixel-level localization masks across benchmark datasets.</span>{' '}
                We compare ForgeryVCR with representative baselines including specialist networks (MVSS-Net, IF-OSN, TruFor, CoDE, HDF-Net, PIM, SAFIRE, FakeShield, SIDA) 
                and forensic-tuned MLLMs. Each row displays results from different datasets (CASIA v1, Columbia, Coverage, DSO, CocoGlide, Korus, In-the-wild, NIST16). 
                Our method consistently produces high-fidelity masks that closely align with the Ground Truth (GT), 
                effectively suppressing background noise and accurately delineating manipulation boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      </div>

      {/* 回到顶部按钮 */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 sm:right-8 bottom-4 sm:bottom-8 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 text-white shadow-lg hover:scale-110 transition-all duration-500 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
