import * as jenkins from 'jenkins';
import { jenkinsConfig } from 'src/config/jenkins';

/**
 * Jenkins连接
 * @param type
 */
export const getJenkins = (type: 'h5' | 'node' | 'nodeProduct' | 'android' | 'java') => {
  return jenkins(jenkinsConfig[type]);
};

/**
 * @description: 触发jenkins流水线
 */
export const buildJenkins = async ({ type, job, params }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).job.build({ name: job, parameters: params }, (err: any, data: any) => {
      if (err) {
        console.log('err: ', err);
        throw err;
      }
      resolve({ queueId: data });
    });
  });
  return { data: jenkinsCallback };
};

/**
 * @description: 获取当前节点信息
 */
export const getQueuedInfo = async ({ type, queueId }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).queue.item(queueId, (err: any, data: any) => {
      if (err) {
        console.log('err---->', err);
        throw err;
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};

/**
 * @description: 获取当前构建信息
 */
export const getJenkinsInfo = async ({ type, job, buildNumber }) => {
  console.log(type, job, buildNumber);
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).build.get(job, buildNumber, (err: any, data: any) => {
      console.log('data: ', data);
      console.log('err: ', err);
      if (err) {
        console.log('err---->', err);
        throw err;
      }
      resolve(data);
    });
  });
  const { statusCode } = jenkinsCallback;
  if (jenkinsCallback && statusCode !== 404) {
    return { data: jenkinsCallback };
  } else {
    return { data: jenkinsCallback };
  }
};

/**
 * @description: 获取jenkins console.log 信息
 */
export const getJenkinsConsole = async ({ type, job, buildId }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).build.log(job, buildId, (err: any, data: any) => {
      if (err) {
        return console.log('err---->', err);
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};
