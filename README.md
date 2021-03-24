
<h3> Groupe 5 - RIGOT Florent / ROBERT François </h3>
<h1> Projet de l'UE Developemment Mobile </h1>
<b>Fonctionnalités mise en place :</b>
<ul>
  <li>Création de compte email / mot de passe</li>
  <li>Récupération de mot de passe</li>
  <li>Authentification email/mot de passe</li>
  <li>Authentification Google (Non testé sur Ios)</li>
  <li>Affichage des listes avec possibilités de filtres ( en fonction des droits que l'utilisateur a sur cette liste )</li>
  <li>Création de listes partagées ou non (en donnant un droit de lecture / ecriture )</li>
  <li>Accès au détail d'une liste (vision sur les todo de cette liste)</li>
  <li>En fonction des droits sur la liste sélectionné: création / suppression de Todos</li>
</ul>
  <b>Sécurité</b>
  <ul>
    <li> <b>Guard angular :</b>
      <ul>
        <li> Un utilisateur non connecté ne peut pas accéder aux pages de l'application </li>
        <li> Un utilisateur dont l'email n'est pas vérifié ne peut pas accéder aux pages de l'application </li>
      </ul>
    </li>
    <li> <b>Firestore rules :</b>
      <ul>
        <li> Un utilisateur non connecté ne peut pas voir / modifier les données de l'application </li>
        <li> Un utilisateur dont l'email n'est pas vérifié ne peut pas voir / modifier les données de l'application </li>
         <li> Un utilisateur qui n'est pas propriétaire d'une liste ne peut pas la supprimer </li>
         <li> Un utilisateur qui n'a pas les droits en ecriture/lecture ou bien qui n'est pas propriétaire d'une liste ne peut pas la voir</li>
         <li> Un utilisateur qui n'a pas les droits en ecriture ou bien qui n'est pas propriétaire d'une liste ne peut pas la modifier</li>
      </ul>
    </li>
    <li> <b>Gestion des droits sur les listes côtés UI :</b>
      <ul>
         <li> Un utilisateur qui n'est pas propriétaire d'une liste ne peut pas la supprimer </li>
         <li> Un utilisateur qui n'a pas les droits en ecriture/lecture ou bien qui n'est pas propriétaire d'une liste ne peut pas la voir</li>
         <li> Un utilisateur qui n'a pas les droits en ecriture ou bien qui n'est pas propriétaire d'une liste ne peut pas la modifier</li>
      </ul>
    </li>
  </ul>
  
  <b>Interface</b>
  <ul>
  <li>Retour utilisateurs lors de certaines actions (Creation compte / changement mot de passe / erreur diverses sur l'appli...</li>
  <li>Possibilité de traduire les textes de l'appli en Anglais/Français</li>
  <li>Menu de navigation</li>
  <li>Bouton de retour en arrière dans les différentes pages</li>
  <li>Utilisation de grid ionic et de Flex pour le placement de certains composants </li>
</ul>
