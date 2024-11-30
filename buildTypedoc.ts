import { exec } from "child_process";

function execute(cmd: string): Promise<string> {
  console.log(cmd);
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      console.log(stderr || stdout);
      (err ? reject : resolve)(err ? stderr || stdout : stdout);
    });
  });
}

const REPOSITORY_NAME = "github-repo-typedoc-build-image";
const TAG_NAME = "v1.0.0";
const CONTAINER_NAME = "github-repo-typedoc-build-instance";

await execute(
  `docker image build --no-cache -f DockerfileTypeDoc -t ${REPOSITORY_NAME}:${TAG_NAME} .`,
);

let exited = false;
void execute(
  `docker run --rm --name ${CONTAINER_NAME} ${REPOSITORY_NAME}:${TAG_NAME}`,
).catch((e) => {
  if (!exited) {
    throw e;
  }
});

await new Promise((resolve) => setTimeout(resolve, 5 * 1000));

await execute(`docker cp ${CONTAINER_NAME}:/usr/local/app/docs/typedocs docs/`);

await execute(`docker container stop ${CONTAINER_NAME}`);
exited = true;

await execute(`docker image rm ${REPOSITORY_NAME}:${TAG_NAME}`);
