import cac from "cac";
import ora from "ora";
import { blue, green, yellow } from "chalk";
import { generateGraph } from "@dep-spy/core";
import { conformConfig } from "./conformConfig";
const cli = cac();
cli
  .command("[analysis,ana]", "解析本地项目依赖关系图")
  .option("--depth <depth>", "依赖图最大深度", {
    type: ["number"],
  })
  .option("--graph <outDir>", "输出依赖图的文件路径", {
    type: ["string"],
  })
  .option("--codependency <outDir>", "输出相同依赖的文件路径", {
    type: ["string"],
  })
  .option("--circularDependency <outDir>", "输出循环依赖的文件路径", {
    type: ["string"],
  })
  .option("--online [online]", "是否在线分析", {
    type: ["boolean"],
  })
  .option("--size [size]", "是否计算文件大小", {
    type: ["boolean"],
  })
  .action(async (_, options) => {
    const spinner = ora(blue(" 🕵️  <<<正在潜入🚀>>>")).start();
    const startTime = Date.now();
    options = await conformConfig(options);
    generateGraph("", options).then(() => {
      spinner.stop();
      console.log(green(`破解完成,耗时 ${yellow(Date.now() - startTime)} ms`));
    });
  });

cli.help();
cli.parse();