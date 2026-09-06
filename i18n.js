const translations = new Map(
  Object.entries({
    "Skip to content": "跳转至正文",
    "Open navigation": "打开导航",
    Research: "研究工作",
    "Undergraduate Journey": "本科经历",
    About: "关于我",
    Experience: "经历",
    "Email me": "联系我",
    "Multimodal AI · Image Forensics": "多模态人工智能 · 图像取证",
    "Building AI that can": "让人工智能真正看见",
    "see the evidence.": "取证证据。",
    "I am": "我是",
    ", a master's student at Shenzhen University. I study how multimodal foundation models perceive, reason about, and localize subtle image manipulation evidence.":
      "，深圳大学硕士研究生。我的研究关注多模态基础模型如何感知、推理并定位细微的图像篡改证据。",
    "Explore my research": "查看研究工作",
    "Undergraduate journey": "本科经历",
    "Shenzhen, China": "中国深圳",
    "Open to research collaboration": "欢迎科研合作",
    "Research focus": "研究方向",
    "Trustworthy Visual AI": "可信视觉智能",
    "first-author research works": "项一作研究工作",
    "ACM Multimedia Oral": "ACM Multimedia Oral 论文",
    "cross-domain benchmarks": "个跨域评测基准",
    "My research moves from": "我的研究从",
    "visual-centric reasoning": "视觉中心推理",
    to: "延伸至",
    "layerwise forensic evidence tracing": "逐层取证证据追踪",
    "Undergraduate archive · 2020–2024": "本科成长档案 · 2020–2024",
    "Mathematics → Research": "数学 → 科研",
    "The foundation behind how I do research.": "构成我研究方式的基础。",
    "Before multimodal AI, mathematics shaped how I approached evidence, uncertainty, and problem solving. Explore the academic work, competitions, early research, and community experiences that formed that foundation.":
      "在接触多模态人工智能之前，数学训练塑造了我理解证据、不确定性与问题求解的方式。这里记录了构成这一基础的学业、竞赛、早期科研与公共服务经历。",
    "Academic rank": "专业排名",
    Recognitions: "荣誉与成果",
    "Enter the undergraduate journey": "进入本科经历",
    "01 / Selected research": "01 / 代表性研究",
    "Research that makes visual evidence explicit": "让视觉证据显式可见的研究",
    "My work connects foundation-model representations with the low-level signals required for reliable image manipulation detection and localization.":
      "我的研究连接基础模型表征与可靠图像篡改检测、定位所需的低层视觉信号。",
    "View full framework ↗": "查看完整框架 ↗",
    "ForgeryVCR turns imperceptible tampering traces into explicit visual evidence with ELA, FFT, NPP, and Zoom-In tools. Gain-driven SFT and GRPO teach the model when and how to invoke those tools without relying on textual rationales.":
      "ForgeryVCR 利用 ELA、FFT、NPP 与 Zoom-In 工具将难以感知的篡改痕迹转化为显式视觉证据，并通过增益驱动 SFT 与 GRPO 学习何时、如何调用工具，减少对文本解释的依赖。",
    "Avg. accuracy": "平均准确率",
    "Avg. BBox-IoU": "平均框级 IoU",
    "Avg. Pixel-IoU": "平均像素级 IoU",
    Project: "项目主页",
    Paper: "论文",
    Code: "代码",
    Model: "模型",
    Demo: "演示",
    "Under review · IEEE TDSC": "投稿审理中 · IEEE TDSC",
    "CLUE repurposes the rectified-flow process of Stable Diffusion 3 as a forensic feature extractor, then combines latent evidence with SAM's spatial context through parameter-efficient adaptation.":
      "CLUE 将 Stable Diffusion 3 的整流流过程重新用于取证特征提取，并通过参数高效适配融合潜在证据与 SAM 的空间上下文。",
    "Evaluated on 7 public manipulation benchmarks": "在 7 个公开篡改基准上评测",
    "Designed for unseen manipulations and post-processing robustness": "面向未知篡改与后处理鲁棒性设计",
    "Under review · AAAI 2027": "投稿审理中 · AAAI 2027",
    "A layerwise study across five MLLM backbones finds that manipulation evidence peaks early and weakens with depth. DELTA models this evolution as an authenticity residual field and predicts masks without an external segmentation model.":
      "对五种 MLLM 骨干的逐层分析表明，篡改证据在浅层达到峰值并随深度减弱。DELTA 将这一演化建模为真实性残差场，无需外部分割模型即可预测掩码。",
    "48.56% Avg. OOD F1": "48.56% 平均 OOD F1",
    "+16.09 points over the strongest retrained baseline": "较最强重训练基线提升 16.09 个百分点",
    "Open research": "开放研究",
    "Explore the complete ForgeryVCR release": "查看完整的 ForgeryVCR 开源成果",
    "Training code, model weights, paper resources, and an interactive demo are available.":
      "训练代码、模型权重、论文资源与交互式 Demo 均已开放。",
    "GitHub repository": "GitHub 仓库",
    "Hugging Face Paper ↗": "Hugging Face 论文 ↗",
    "Evidence over assumption.": "以证据替代臆测。",
    "02 / About": "02 / 关于我",
    "I study where forensic evidence lives inside foundation models.": "我研究取证证据如何存在于基础模型之中。",
    "I am currently pursuing a master's degree in Information and Communication Engineering at Shenzhen University. My research focuses on multimodal large language models, image manipulation localization, and agentic tool use for visual forensics.":
      "我目前在深圳大学攻读信息与通信工程硕士学位，研究方向包括多模态大语言模型、图像篡改定位，以及面向视觉取证的智能体工具调用。",
    "I care about mechanisms as much as benchmarks: what evidence a model preserves, how that evidence changes through depth, and how a model can use external tools only when they add diagnostic value.":
      "我同样关注性能与机制：模型保留了什么证据、证据如何随网络深度演化，以及模型如何仅在工具具有诊断价值时调用外部工具。",
    "Multimodal LLMs": "多模态大语言模型",
    "Image Forensics": "图像取证",
    "Representation Analysis": "表征分析",
    "Reinforcement Learning": "强化学习",
    "Tool-using Agents": "工具调用智能体",
    "03 / Experience & education": "03 / 经历与教育",
    "A research path grounded in mathematics and visual AI": "以数学与视觉智能为基础的研究路径",
    "Research experience": "科研经历",
    "Computer vision research intern. Led first-author research on visual-centric MLLM reasoning and layerwise evidence tracing for image manipulation localization.":
      "计算机视觉研究实习生。以第一作者身份开展视觉中心 MLLM 推理与图像篡改定位逐层证据追踪研究。",
    Education: "教育经历",
    "M.Eng. in Information and Communication Engineering. Academic rank: 1 / 75.":
      "信息与通信工程硕士研究生，专业排名 1 / 75。",
    "Engineering experience": "工程经历",
    "Contributed retrieval and long-context conversation capabilities to a quantum-domain large language model.":
      "参与量子领域大语言模型的检索与长上下文对话能力建设。",
    "B.Sc. studies in Mathematics and Applied Mathematics.": "数学与应用数学本科。",
    "Selected recognition": "代表性荣誉",
    "China Undergraduate Mathematical Contest in Modeling · Jiangsu First Prize": "全国大学生数学建模竞赛 · 江苏省一等奖",
    "04 / Contact": "04 / 联系方式",
    "Interested in trustworthy visual AI?": "关注可信视觉智能？",
    "I welcome conversations about multimodal learning, image forensics, and research collaboration.":
      "欢迎围绕多模态学习、图像取证与科研合作展开交流。",
    "GitHub profile ↗": "GitHub 主页 ↗",
    "Youqi Wang. Built for open research.": "Youqi Wang · 为开放研究而构建。",

    Academics: "学业",
    Competitions: "竞赛",
    "Early research": "早期科研",
    Awards: "荣誉",
    "Back home": "返回首页",
    "The foundations behind the research.": "研究背后的成长基础。",
    "Mathematics trained my attention to structure and evidence. Competitions, early research, and community work turned that foundation into a habit of building, testing, and sharing.":
      "数学训练塑造了我对结构与证据的关注；竞赛、早期科研与公共服务，则让这种基础转化为构建、验证与分享的习惯。",
    "Explore the journey": "浏览成长经历",
    "View award archive": "查看荣誉档案",
    "recognitions across academics, research, and competitions": "项学业、科研与竞赛荣誉",
    "Modeling competitions awarded": "次数学建模竞赛全部获奖",
    "A four-year trajectory": "四年成长轨迹",
    "From mathematical training to research practice.": "从数学训练走向科研实践。",
    "The undergraduate years were not a separate chapter from my current work; they built the quantitative discipline, engineering instincts, and collaborative habits behind it.":
      "本科经历并非与当前研究割裂的章节，它奠定了我开展研究所需的定量训练、工程直觉与协作习惯。",
    "01 / Academic foundation": "01 / 学业基础",
    "Mathematics as a way of seeing structure.": "以数学理解结构。",
    "Ranked first in a cohort of 75 with strong performance across analysis, algebra, differential equations, numerical methods, programming, and mathematical modeling.":
      "专业 75 人中排名第一，在数学分析、代数、微分方程、数值方法、程序设计与数学建模等课程中表现突出。",
    "Program rank": "专业排名",
    "of 75": "共 75 人",
    "Reading GPA": "雷丁大学 GPA",
    "Vector Calculus · 100": "向量微积分 · 100",
    "Differential Equations · 100": "微分方程 · 100",
    "Numerical Analysis · 99": "数值分析 · 99",
    "Linear Algebra · 98": "线性代数 · 98",
    "Complex Analysis · 97": "复分析 · 97",
    "Mathematical Modeling · 96": "数学建模 · 96",
    "02 / Competitions": "02 / 竞赛经历",
    "Model, build, test, repeat.": "建模、实现、验证、迭代。",
    "Seven mathematical modeling competitions, seven awards, followed by a team robotics challenge.":
      "参加七次数学建模竞赛并全部获奖，随后将建模与工程能力延伸至团队机器人竞赛。",
    "2023 · Featured achievement": "2023 · 代表性成果",
    "Mathematical Contest in Modeling · Finalist": "美国大学生数学建模竞赛 · Finalist",
    "Reached the top 1.8% among 11,296 teams—the highest award level achieved by the university in this competition that year.":
      "在 11,296 支队伍中位列全球前 1.8%，为学校当年在该竞赛中取得的最高奖项。",
    "global top tier": "全球前列",
    "Mathematical modeling": "数学建模",
    "Seven competitions, all awarded": "七次参赛，全部获奖",
    "Highlights include Jiangsu First Prize in CUMCM and First Prize in APMCM, both placing within roughly the top five percent of their respective fields.":
      "代表性成果包括全国大学生数学建模竞赛江苏省一等奖与 APMCM 一等奖，两项成绩均位于各自赛道约前 5%。",
    "Team engineering": "团队工程实践",
    "Won provincial and national second prizes in the Safe City track.": "在“平安城市”赛道获得省级二等奖与全国二等奖。",
    "Provincial Second Prize": "省级二等奖",
    "National Second Prize": "全国二等奖",
    "03 / Early research & engineering": "03 / 早期科研与工程实践",
    "Turning mathematical ideas into working systems.": "将数学思想转化为可运行的系统。",
    "Principal investigator · Jiangsu undergraduate innovation project": "项目负责人 · 江苏省大学生创新训练计划",
    "Multimodal transfer learning for automated road-damage detection": "面向道路病害自动检测的多模态迁移学习",
    "Led the project from data construction and cross-domain transfer to detection model design and evaluation. The work established an early interest in visual evidence, localization, and model robustness.":
      "负责数据构建、跨域迁移、检测模型设计与评测全过程。这项工作开启了我对视觉证据、目标定位与模型鲁棒性的持续关注。",
    "2 software copyrights": "2 项软件著作权",
    "1 utility-model patent": "1 项实用新型专利",
    "1 first-author manuscript": "1 篇一作论文",
    "May–December 2023 · Research internship": "2023 年 5 月至 12 月 · 科研实习",
    "Applied mathematical and engineering foundations to retrieval and long-context conversation capabilities for a quantum-domain large language model.":
      "将数学与工程基础用于量子领域大语言模型的检索及长上下文对话能力建设。",
    "Technical sharing · Baidu Research": "技术分享 · 百度研究院",
    "04 / Community": "04 / 公共服务",
    "Knowledge grows when it is shared.": "知识因分享而生长。",
    "volunteer hours": "小时志愿服务",
    "Contributed as a volunteer and class leader, supporting outreach activities and class development.":
      "参与志愿服务并担任班级负责人，支持科普活动与班级建设。",
    "shared study notes": "份共享学习笔记",
    "Built a subject learning community and spent more than 200 hours mentoring peers and younger students.":
      "创建学科学习社群，投入 200 余小时帮助同学与低年级学生。",
    "05 / Next chapter": "05 / 下一阶段",
    "A foundation strong enough to create choices.": "扎实基础带来更多选择。",
    "Received postgraduate offers from Imperial College London and the London School of Economics, alongside recommendation offers from Northeastern University, Nanjing University of Science and Technology, and Shenzhen University.":
      "获得帝国理工学院与伦敦政治经济学院硕士录取，以及东北大学、南京理工大学与深圳大学的推免录取资格。",
    "Imperial College London": "帝国理工学院",
    "London School of Economics": "伦敦政治经济学院",
    "Northeastern University": "东北大学",
    "Nanjing University of Science & Technology": "南京理工大学",
    "Shenzhen University": "深圳大学",
    "06 / Award archive": "06 / 荣誉档案",
    "Milestones, preserved beyond the moment.": "让每个里程碑被认真留存。",
    "A complete archive of 23 distinct certificates spanning academics, modeling, engineering, research outputs, leadership, and service.":
      "完整收录 23 项荣誉与成果，涵盖学业、建模、工程、科研产出、学生工作与志愿服务。",
    "Modeling competition": "数学建模竞赛",
    "Third Prize · 2022": "三等奖 · 2022",
    "Student leadership": "学生工作",
    "University recognition": "校级荣誉",
    "First-Class Scholarship": "一等奖学金",
    "Academic excellence": "学业优秀",
    "Model Student": "三好学生标兵",
    "Top 2% in the program": "专业前 2%",
    "Modeling network challenge": "数学建模网络挑战赛",
    "National competition": "全国竞赛",
    "Jiangsu First Prize": "江苏省一等奖",
    "Summer practice": "暑期社会实践",
    "Outstanding Team": "优秀团队",
    "Advanced Individual": "先进个人",
    "University modeling contest": "校数学建模竞赛",
    "First Prize": "一等奖",
    "RAICOM robotics": "RAICOM 机器人竞赛",
    "National award": "全国奖项",
    "Provincial Triple-A Student": "江苏省三好学生",
    "Jiangsu · 2023": "江苏 · 2023",
    "National mathematics competition": "全国大学生数学竞赛",
    "Competition award": "竞赛奖项",
    "Tianji Scholarship": "天技科技励志奖学金",
    "College top two": "全院仅 2 人",
    "Provincial award": "省级奖项",
    "First Prize · Top 5%": "一等奖 · 前 5%",
    "Youth League recognition": "共青团荣誉",
    "Outstanding Member": "优秀共青团员",
    "Volunteer service": "志愿服务",
    "Community contribution": "公共服务",
    "Global top 1.8%": "全球前 1.8%",
    "Software copyright": "软件著作权",
    "Road damage system": "道路病害系统",
    "Detection system": "检测系统",
    "Utility-model patent": "实用新型专利",
    "First inventor": "第一发明人",
    "Current direction": "当前研究",
    "The foundation remains. The questions became visual.": "基础仍在，研究问题转向视觉智能。",
    "See how this trajectory evolved into research on multimodal models and trustworthy image forensics.":
      "查看这段经历如何延伸为多模态模型与可信图像取证研究。",
    "Explore current research": "查看当前研究",
    "Mathematics · Visual AI · Image Forensics": "数学 · 视觉智能 · 图像取证"
  })
);

const textNodes = [];
const originalText = new WeakMap();
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
      return NodeFilter.FILTER_REJECT;
    }
    return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }
});

while (walker.nextNode()) {
  const node = walker.currentNode;
  textNodes.push(node);
  originalText.set(node, node.nodeValue);
}

const normalize = (value) => value.trim().replace(/\s+/g, " ");

function applyLanguage(language) {
  textNodes.forEach((node) => {
    const source = originalText.get(node);
    const key = normalize(source);
    const localized = language === "zh" ? translations.get(key) ?? key : key;
    const leading = source.match(/^\s*/)[0];
    const trailing = source.match(/\s*$/)[0];
    node.nodeValue = `${leading}${localized}${trailing}`;
  });

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = language === "zh"
    ? document.body.classList.contains("undergraduate-page")
      ? "本科经历 | Youqi Wang"
      : "Youqi Wang | 多模态人工智能研究者"
    : document.body.classList.contains("undergraduate-page")
      ? "Undergraduate Journey | Youqi Wang"
      : "Youqi Wang | Multimodal AI Researcher";

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.querySelector("[data-language-label]").textContent = language === "zh" ? "EN" : "中文";
    button.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换为中文");
  });
}

let currentLanguage = localStorage.getItem("youqi-language") === "zh" ? "zh" : "en";
applyLanguage(currentLanguage);

document.querySelectorAll("[data-language-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem("youqi-language", currentLanguage);
    applyLanguage(currentLanguage);
  });
});
