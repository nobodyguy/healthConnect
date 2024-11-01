# healthconnect

## Installation

Install the application dependencies by running:

```sh
npm install
```

## Development

Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

## DataProvider

The included data provider use [FakeREST](https://github.com/marmelab/fakerest) to simulate a backend.
You'll find a `data.json` file in the `src` directory that includes some fake data for testing purposes.

It includes two resources, posts and comments.
Posts have the following properties: `id`, `title` and `content`.
Comments have the following properties: `id`, `post_id` and `content`.

## Tests

You can run the included tests with the following command:

```sh
npm run test
# or
yarn run test
```
## Authentication

The included auth provider should only be used for development and test purposes.
You'll find a `users.json` file in the `src` directory that includes the users you can use.

You can sign in to the application with the following usernames and password:
- janedoe / password
- johndoe / password


# Description

## Uživatelské účty a pacienti
* Pacient je DB entita párovaná s údaji v NIS
* na Pacienta je linkován jeden nebo více Uživatelů (pacient sám nebo jeho zákonní zástupci)
* každý lékař vidí a může spravovat data všech Pacientů v dané organizaci (uvažujeme ccelý portál jen pro jednu instituci)
* Pacienta vytváří vždy lékař po osobní návštěvě pacienta v ordinaci
* Uživatel může sám vytvořit účet (svůj, případně opatrovnický), link na Pacienta a aktivace Uživatele je ale možná pouze lékařem při osobní návštěvě v ordinaci
* lékař může vytvořit Uživatele a uživateli předat aktivační link/PIN/jednorázové heslo (osobně, email, SMS,...)
* přihlášení Uživatele prozatím probíhá přes username-password, pro reálný provoz nejspíš bude vyžadovat elektronickou identitu, biometrii atd.
* Uživatel má úroveň oprávnění User (pacient nebo opatrovník) nebo Admin (lékař)
* Uživatel může měnit údaje svého účtu, údaje Pacienta ale mění pouze lékař (případně Uživatel může poslat request na změnu, kterou lékař potvrzením aplikuje?)
* v případě zániku opatrovnictví lze Uživatele deaktivovat nebo zrušit link na Pacienta (v případě dospělosti dítěte mu bude vytvořen vlastní Uživatel)

## GUI lékaře
* lékař po přihlášení vidí widgety s jeho profilem, s proklikem na přehled Pacientů, přehled Požadavků, administraci Uživatelů (?), feed nejaktuálnějších údálostí (?), rozpis volných a booknutých termínů v kalendáři (?)
* Pacienti s novou aktivitou jsou graficky označeni (TODO: vymyslet jak, aby to svítilo lékařům, kteří to ještě nezobrazili, nebo všem, dokud aspoň jeden nezaregauje? nová událost může být nová akce v exitujícím Požadavku nebo jeho editace, vytvoření nového Požadavku,...)
* lékař se může prokliknout na Detail pacienta
* lékař se může prokliknout na Detail požadavku (do budoucna možnost přopojení se sloty v Kalendáři?)
* lékař se může prokliknout na Detail uživatele
* lékař může otevřít přehled a editaci svého profilu
* lékař může otevřít Kalendář a zobrazit volné a booknuté sloty a pracovat s nimi
* lékař může změnit osobní nastavení aplikace v hlavním navbaru - light/dark mode, jazyk, odhlásit se

## GUI uživatele
* uživatel po přihlášení vidí svůj profil, seznam svých otevřených i uzavřených Požadavků, svého Pacienta (v případně dospělého) nebo Pacientů (v případě opatrovníka)
* uživatel může editovat data svého profilu, ne však data Pacienta (může poslat Požadavek na editaci s novými údaji?)
* uživatel může založit nový Požadavek (žádost o vyšetření, dálkové vyhodnocení stavu lékařem z popisu nebo fotky, ...)
* uživatel může zabookovat volný slot na termín návštěvy lékaře (do budoucna)

## Požadavky
* Požadavek je entita v DB s atributy:
  * ID pacienta
  * ID uživatele, který jej zakládá a bude jej řešit
  * stav (open, done, ...)
  * kategorie (termín vyšetření, aktualizace údajů, dálková konzultace,...)
  * urgence (graficky barevně rozlišit?)
  * datum vytvoření
  * datum poslední aktualizace dat
  * vazba na Soubory (mapa URI souborů?)
  * vazba na Konverzace (tabulka zpráv uživatelů s lékaři v rámci Požadavku)
* požadavek může být vytvořen jedním Uživatelem, nicméně lékař i uživatel se můžou rozhodnout přidat do něj i další Uživatele, kteří jsou linkovaní ke stejnému Pacientovi (případně je lékař může i odebrat?)
* v Detailu požadavku jsou vyfiltrovány soubory a zprávy vztahující se k Požadavku
* Soubory: lékařské zprávy nebo soubory od uživatelů v rámci daného Požadavku - entita v DB s atributy:
  * název?
  * URI
  * typ (pro filtry)?
* Konverzace: komunikace lékařů a uživatelů v rámci daného Požadavku - entita v DB s atributy:
  * ID uživatele
  * ID pacienta
  * zpráva

NĚCO DÁL?
