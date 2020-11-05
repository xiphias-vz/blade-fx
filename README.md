# Spryker B2C Demo Project
[![Minimum PHP Version](https://img.shields.io/badge/php-%3E%3D%207.1-8892BF.svg)](https://php.net/)

## Docker installation

For troubleshooting, please, refer to [Troubleshooting](https://documentation.spryker.com/docs/spryker-in-docker-troubleshooting)

### Preparation

Please, follow the instructions: [Prerequisites](https://documentation.spryker.com/docs/docker-installation-prerequisites).

Make sure docker 18.09.1+ and docker-compose 1.23+ are installed:

- $ docker version
- $ docker-compose --version

Mac users would increase vCPU and RAM dedicated for docker:
- **4 vCPU** and **6GB RAM** for 15' Macbook
- 2 vCPU and 4GB RAM for 13' Macbook

### Installation

```bash
mkdir spryker-click-and-collect && cd spryker-click-and-collect
git clone git@github.com:globussbwarenhaus/spryker-click-and-collect.git ./
```
```bash
git submodule update --init --force docker
echo "127.0.0.1 www.welcome.ccd.demo-spryker.local www.berlin.ccd.demo-spryker.local www.hamburg.ccd.demo-spryker.local backoffice.ccd.demo-spryker.local zed.berlin.ccd.demo-spryker.local zed.hamburg.ccd.demo-spryker.local filial-app.berlin.ccd.demo-spryker.local filial-app.hamburg.ccd.demo-spryker.local" | sudo tee -a /etc/hosts
```

### Developer environment

#### I. The very first run (after clone)
```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

#### II. Git checkout
```bash
git checkout your_branch
git submodule update --init --force docker && docker/sdk boot -s deploy.dev.yml

docker/sdk up --build --assets --data
```
! `up` command arguments are optional !

- `--build` To get composer be updated, transfer be generated, etc. Can be skipped if no related changes.
- `--assets` To get assets be built. Can be skipped.
- `--data` To get new demo data. Can be skipped.

#### III. Code reload. Something weird happened with code
```bash
docker/sdk trouble
rm -rf ./docker && git submodule update --init --force docker && docker/sdk boot -s deploy.dev.yml

docker/sdk up --build --assets
```

#### III. Full reload. Something weird happened with data
```bash
docker/sdk trouble
rm -rf ./docker && git submodule update --init --force docker && docker/sdk boot -s deploy.dev.yml

docker/sdk up --build --assets --data
```

### Production-like environment

#### I. The very first run (after clone)
```bash
docker/sdk boot -s
docker/sdk up
```

#### II. Git checkout with assets and data
```bash
git checkout your_branch
git submodule update --init --force docker && docker/sdk boot -s

docker/sdk up --assets --data
```

! `up` command arguments are optional !

- `--assets` To get assets be built. Can be skipped.
- `--data` To get new demo data. Can be skipped.

#### III. Git checkout light
```bash
git checkout your_branch
git submodule update --init --force docker && docker/sdk boot -s

docker/sdk up
```

#### IV. Reload all the data
```bash
docker/sdk clean-data && docker/sdk up && docker/sdk console q:w:s -v -s
```

### Troubleshooting

#### I. Fail whale on Yves OR no data on Yves
Use this services to check the status of queues and jobs.
- queue.demo-spryker.local
- scheduler.demo-spryker.local

#### II. Fail whale
```bash
docker/sdk logs
```
- Input several Enter to mark the line when you started.
- Open page with an error.

#### III. 502 error
```bash
docker/sdk restart
```

#### IV. Suspicies on docker-sync [DEV MODE]
To follow wather logs:
```bash
docker/sdk sync logs
```
Hard reset:
```bash
docker/sdk trouble && rm -rf vendor && rm -rf src/Generated && docker/sdk sync && docker/sdk up
```

#### V. `ERROR: remove spryker-demo-project_logs: volume is in use - [SOMETHING]`
```bash
docker rm -f SOMETHING
```
And repeat the command.

#### VI. `Route '/de' not found, Route 'Route '/de' not found' not found`
Check jobs and queue. If queue is empty `docker/sdk demo`.

#### VII. `Error response from daemon: OCI runtime create failed: .... \\\"no such file or directory\\\"\"": unknown.`
Retry the command that fails.
