/**
 * Copyright Microsoft Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type Config = {
  debug?: boolean;
  forbidOnly?: boolean;
  globalTimeout: number;
  grep?: string;
  jobs: number;
  outputDir: string;
  quiet?: boolean;
  repeatEach: number;
  retries: number,
  shard: { total: number, current: number } | undefined,
  snapshotDir: string;
  testDir: string;
  timeout: number;
  trialRun?: boolean;
  updateSnapshots?: boolean;
};
