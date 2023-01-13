# README ugram-h2021-team-05

## Utilisation de l'app dans docker:

Il est recommendé d'utiliser la version desktop de docker.

Les noms des conteneurs créés par docker sont respectivement:

- frontend: ugram-h2021-team-05_ugram_1

- backend: ugram-h2021-team-05_ugrambackend_1

- BD: ugram-h2021-team-05_mysql_1

Pour construire les images dockers et lancer tous les containers, allez à la racine du projet dans un terminal (répertoire contenant docker-compose.yml) et entrez "docker-compose up --build".

Le premier build peut prendre un certain temps à compléter.

- (Re)Construire les images et lancer les containers: docker-compose up --build

- Lancer les containers sans re-construire les images : docker-compose up

- Lancer les containers en background (et laisser le terminal disponible): docker-compose up -d

- Arrêter les containers (si les containers sont en background): docker-compose stop

- Arrêter les containers (si les containers roulent dans le terminal): faite ctrl+c dans le terminal

- Pour supprimer un conteneur: docker container rm «nom_du_container»

Pour lancer seulement le frontend (pour développement sans besoins d'utiliser le backend), ouvrez le répertoire "ugram" dans un terminal et faites "npm start" comme d'habitude.

Les changements au script d'initialisation de la BD ne prennent pas toujours effet même avec un re-build de l'image. Si vous avez des erreurs sequelize là ou vous n'en aviez pas avant, il est possible qu'il y ait une incohérence avec la BD. Dans ce cas, supprimer le conteneur de la BD corrige généralement le problème. Le container sera reconstruit automatiquement avec docker-compose up --build avec les changements de script incorporés.

## API documentation

### Users

-GET :

ugram/users obtenir tous les utilisateurs

Ajoutez un body contenant le userName pour obtenir seulement cet utilisateur:

```
{
  "userName": "exempleUser"
}
```

ugram/users/userId obtenir un utilisateur par son Id

-POST :

ugram/users creer un nouvel utilisateur et l'ajouter a la BD

La requête doit contenir un body de cette forme:

```
{
  "userName": "exempleName",
  "email": "exempleEmail",
  "lastName": "Bellavance",
  "firstName": "Julien",
  "phone": "1999999999", (optionnel, doit obligatoirement faire 10 chiffres)
  "profilePicUrl": "exmpleUrl.com" (optionnel)
}
```

-PUT :

ugram/users/userId modifie un utilisateur

La requête doit contenir un body de cette forme (tous les champs sont optionnels, vous pouvez ajouter seulement ce que vous voulez modifier):

```
{
  "userName": "exempleName", (le email et le user name doivent rester uniques dans la bd)
  "email": "exempleEmail",
  "lastName": "Bellavance",
  "fisrtsName": "Julien",
  "phone": "1999999999", (doit obligatoirement faire 10 chiffres)
  "profilePicUrl": "exmpleUrl.com"
}
```

-DELETE :

ugram/users/userId supprimer un utilisateur (PAS ENCORE IMPLÉMENTÉ)

<-------------------------------------------------->

### Images

-GET :

ugram/images obtenir toutes les images. 

Ajoutez un body de cette forme pour obtenir toutes les images d'un seul utilisateur:

```
{
  "userId": 1
}
```

ugram/images/imageId obtenir une image par son ID

-POST :

ugram/images créer une nouvelle image

La requête doit contenir un body de cette forme:

```
{
  "userId": 1,
  "imageUrl": "exempleUrl.com",
  "descript": "Exemple description" (optionnel, on n'utilise pas description car c'est un mot clé mysql)
}
```

-PUT :

ugram/images/imageId modifie une image

La requête doit contenir un body de cette forme (tous les champs sont optionnels):

```
{
  "imageUrl": "exempleUrl.com",
  "descript": "Exemple description"
}
```

-DELETE :

ugram/images/imageId supprime une image. Supprime également tous les hashtags et les mentions associés

<-------------------------------------------------->

### Mentions
-GET :

ugram/mentions obtenir toutes les mentions. 

Ajoutez un body de cette forme pour obtenir toutes les mentions d'une seule image:

```
{
  "imageId": 1
}
```

ugram/mentions/mentionId obtenir une mention par son id

-POST :

ugram/mentions créer une nouvelle mention

La requête doit contenir un body de cette forme:

```
{
  "imageId": 1,
  "userName": "exempleUser"
}
```

-PUT :

ugram/mentions/mentionId modifie une mention

La requête doit contenir un body de cette forme:

```
{
  "userName": "exempleUser"
}
```

-DELETE :

ugram/mentions/mentionId supprime une mention

<-------------------------------------------------->

### Hashtags

-GET :

ugram/hashtags obtenir tous les hashtags. 

Ajoutez un body de cette forme pour obtenir tous les hashtags d'une seule image:

```
{
  "imageId": 1
}
```

ugram/hashtags/hashtagId obtenir un hashtag spécifique

-POST :

ugram/hashtags créer un nouveau hashtag

La requête doit contenir un body de cette forme:

```
{
  "imageId": 1,
  "tag": "#exempleHashTag"
}
```

-PUT :

ugram/hashtags/hashtagId modifie un hashtag

La requête doit contenir un body de cette forme:

```
{
  "imageId": 1,
  "tag": "#exempleHashTag"
}
```

-DELETE :

ugram/hashtags/hashtahId supprimer un hashtag

<-------------------------------------------------->

### Routes utiles:

GET ugram/profile/userId Obtenir un utilisateur par son id et toutes ses images, incluant les mentions et hashtags associés.

GET ugram/profile Obtenir un user par son nom d'utilisateur. Le nom doit être indiqué dans le body, si non on ne garantit pas le comportement.

Exemple de body:
```
{
  "userName": "exempleUser"
}
```

POST ugram/posts Créer une nouvelle image et les hashtags et mentions qui lui sont associés

Le body de la requête doit contenir toutes les informations sous cette forme:

```
{
  "userId": 1,
  "imageUrl": "exempleUrl.com",
  "descript": "Exemple description", (optionnel)
  "mentions": [
    {
      "userName": "exempleUser"
    },
    {
      "userName": "exempleUser2"
    }
    ...
  ],
  "hashtags": [
    {
       "tag": "#exempleTag"
    },
    {
      "tag": "#exempleTag2"
    }
    ...
  ]
}
```

GET ugram/posts/imageId Obtenir une image avec tous ses hashtags et mentions associés par l'id de l'image

GET ugram/posts obtenir toutes les images avec tous leurs hashtags et mentions.

Ajoutez un body de cette forme pour obtenir tous les posts d'un seul user:

```
{
  "userId": 1
}
```

## Livrable 0: Design

L'application UGram de notre équipe utilisera React comme framework frontend. Nous ne sommes pas expérimentés avec ce framework et pensons qu'il s'agit d'une bonne occasion de l'apprendre. Nous comptons également utiliser la librairie Material-UI pour React pour faciliter l'ajout de components à notre application.
WebPack sera utilisé pour effectuer la routine de compilation du projet, avec Babel comme transpileur, et EsLint pour l'optimisation.

Nous utiliseront le préprocesseur CSS SASS. Nous pensons que nous seront plus à l'aise avec ce preprocesseur pusqu'il serra vu en cours.

Le backend utilisera NodeJS, car la majorité de l'équipe y est familière. L'ORM choisi est Sequelize, et la base de données sera en MySql et fournie par AWS. Le logging utilisera Winston, qui semble proposer une bonne simplicité d'utilisation. Nous utiliseront également Swagger pour la documentation de l'API.

Le déploiement de l'application se fera à l'aide de AWS Amplify. Cet environnement permettra de déployer et host le front end et le backend directement. De plus, il pourra être connecté au repo Github afin d'effectuer l'intégration et le déploiement continue.
