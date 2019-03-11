# My Team @ Church

This SAAS Platform is designed to help churches develop leaders and team members.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Docker

### Installing

A step by step series of examples that tell you how to get a development env running

#### Getting Started

```
git clone https://github.com/EvChurch/my-team-church.git
cd my-team-church
```

#### Environment

```
cp .env .env.development
cp config/database.example.yml config/database.yml
```

You'll need to configure credentials to local and external services in your .env file

#### Running the Project

```
docker-compose up --build
```

Navigate to [lvh.me:3000](http://lvh.me:3000)

## Deployment

### master

The master branch is deployed to production at [myteam.church](https://myteam.church/)

### stage

The stage branch is deployed to staging [stage.myteam.church](https://stage.myteam.church/)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/EvChurch/my-team-church/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Tataihono Nikora** - *Initial work* - [ardation](https://github.com/ardation)

See also the list of [contributors](https://github.com/EvChurch/my-team-church/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
