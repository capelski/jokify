const jokes = [

	'Como maldice un pollo a otro pollo? Caldito seas!',

	'- Cariño, pronto sera nuestro aniversario. Que me vas a regalar?<br />' +
	'- Ves ese coche aparcado? Pues una liquadora del mismo color',

	'La noche de bodas, el novio encuentra a la novia en la cama con un enano<br />' + 
	'- ¿Y ese quién es?<br />' +
	'- El aperitivo!',

	'Un hombre llega a casa y se encuentra a su mujer en la cama con otro<br />' +
	'- ¿Y ese quién es?<br />' +
	'- Ése es quien paga el piso, la luz, la comida, el colegio de las niñas, ...<br />' +
	'- Tápalo, tápalo! Que no se resfrie!',

	'- Oye, ¿tu mujer a que se dedica?<br />' +
	'- Mi mujer es jinete de aves de corral<br />' +
	'- Hostia, ¿Y eso que es?<br />' +
	'- Que cada dos por tres me monta un pollo',
	
	'- ¿Tienes hijos?<br />' +
	'- Sí, una niña. Está en esa edad que se lo mete todo en la boca<br />' +
	'- ¿6 meses?<br />' +
	'- ¡Qué va! 16 años',

	'- ¿Cómo se declara el acusado?<br />' +
	'- Con flores. Soy bastante tradicional',

	'- ¡Paco quita el futbol y baja la basura!<br />' +
	'- ¡Cualquier día de estos cojo la puerta y...!<br />' +
	'- ¡¿Y!?<br />' +
	'- Y la lijo y la barnizo, que falta le hace...',

	'Solo cuando se posa un mosquito en tus testículos te das cuenta que no todo se soluciona con violencia',

	'- ¿Lobezno?<br />' +
	'- ¿Que zi veo el qué?<br />' +
	'- ¡CORTEN!... ¡Por decimotercera vez, deja de hacer la broma ya y cíñete al guión joder!',

	'- Que fea es esa tía<br />' +
	'- Es mi madre<br />' +
	'- No, digo la de al lado<br />' +
	'- Esa es mi hermana<br />' +
	'- Pues pégame dos hostias q esto ya no hay quien lo arregle',

	'- Nunca me escuchas<br />' +
	'- Y yo a ti',

	'- Cari, di a mis padres lo que me dijiste anoche<br />' +
	'- Ehhh... ¿Que me pones la polla como el pescuezo de un cantaor?<br />' +
	'- No, lo de la boda, gilipollas',

	'- En boca es plano, le falta pasión, textura, apenas notó el bacalao...<br />' +
	'- Manolo, cómeme el coño y deja de jugar a master chef',

	'- ¿Y tu desde cuando llevas pendiente, Paco?<br />' +
	'- Desde que mi mujer se lo encontró en el coche y le dije que era mío...',

	'- ¿Quieres que te mire a los ojos cuando me lo meta en la boca?<br />' +
	'- Señorita, compórtese y sople el alcoholímetro por favor',

	'- Hija, deja de ligar con el panadero, podría ser tu padre<br />' +
	'- Me da igual que sea mayor que yo<br />' +
	'- Creo que no me has entendido',

	'- Cariño, hoy que vamos con el tiempo justo, lo mejor va a ser una comida rápida<br />' +
	'- ¿Qué te apetece, Paco? ¿Pizza?<br />' +
	'- Creo que no me has entendido',

	'- Estás más delgada, no?<br />' +
	'- Es que el negro me adelgaza...<br />' +
	'- Pero si vas de rojo!<br />' +
	'- Creo que no me has entendido',

	'- A mi se me conquista con una buena comida<br />' +
	'- Te he hecho macarrones<br />' +
	'- Creo que no me has entendido',

	'- He denunciado al dentista por ponerme el aparato en la boca<br />' +
	'- Si te lo ha puesto es porque lo necesitas<br />' +
	'- Creo que no me has entendido',

	'- Tu mujer me pidió que le ayudara con una estantería y acabe montándola<br />' +
	'- Es que no se le da nada bien el bricolaje<br />' +
	'- Creo que no me has entendido',

	'- Necesito tu ayuda me quieren matar en Sevilla por joderles a la virgen de la Rocío<br />' +
	'- Normal allí son muy religiosos<br />' +
	'- Creo que no me has entendido',

	'- Siempre que quiero follar con mi mujer dice que le duele la cabeza<br />' +
	'- A mi nunca me lo dice<br />' +
	'- Pero tú no estás casado<br />' +
	'- Creo que no me has entendido',

	'- Mi mujer se metió ayer una piña y hemos pasado la noche en urgencias<br />' +
	'- ¿Con el coche? ¿Pero está bien?<br />' +
	'- Creo que no me has entendido',

	'- ¡O te quitas esa falda tan corta o no sales!<br />' +
	'- ¿Por qué, mamá?<br />' +
	'- Porque es muy corta<br />' +
	'- ¿Y quéeee?<br />' +
	'- ¡Que se te ven los huevos, José Miguel!',

	'- Por el culo no, Pepe<br />' +
	'- Pues ya me dirás, Paco',

	'- Cariño, está lloviendo y sigues siendo una puta<br />' +
	'- ¿Y qué?<br />' +
	'- Me dijiste que con el tiempo cambiarias',

	'- Papá, ¿soy adoptado?<br />' +
	'- Te elegimos negro para no tener esta conversación',

	'- Cariño, ¿me engañas con otra?<br />' +
	'- Vale',

	'- Cariño, tengo un retraso<br />' +
	'- Tranquila, tontita, que te quiero igual',

	'- Soy un noble caballero y sé cuando he de manchar con sangre mi espada<br />' +
	'- Manolo, déjate de gilipolleces, que con la regla no follo',

	'Qué cabrón mi vecino. ¿Pues no se pone a llamar a mi puerta como un loco a las 4 de la mañana? Casi se me cae el taladro del susto',

	'- ¿Te parece bonito?<br />' +
	'- Sí<br />' +
	'- Pues es rodaballo<br />',

	'- Entonces, doctor, ¿con este condón de lana se curará mi impotencia?<br />' +
	'- No, pero le sudará la polla',

	'- Mamá, ¿cómo es que tú eres blanca, papá es negro y yo soy amarillo?<br />' +
	'- Hijo mío, si supieras la orgía que hubo aquel día... Agradece que no ladras',

	'- Qué estrés<br />' +
	'- Dos más uno',

	'- Se te dan fatal las rimas<br />' +
	'- ¡Una mierda como una olla!',

	'- ¿Sabías que las cajas negras de los aviones en realidad son naranjas?<br />' +
	'- ¿¡No son cajas!?',

	'- ¿Puedo fumar?<br />' +
	'- Claro<br />' +
	'- Vale. Uno maf uno, dof. Dof maf dof, cuatro. Tref maf tref, feif',

	'- Mi marido es vidente<br />' +
	'- ¿Tiene dos dientes?<br />' +
	'- ¿Tú eres tonto? ¡Que echa las cartas!<br />' +
	'- Tú sí que eres tonta, ¡entonces será cartero!',

	'- Jolín con los mosquitos<br />' +
	'- Ponte repelente<br />' +
	'- Madre mía, qué ingente cantidad de dípteros nematóceros',

	'- Cariño... ¿y si tuviéramos un hijo?<br />' +
	'- No creo, cielo, me acordaría',

	'- ¡Papá, papá, Jaimito la tiene com un cacahuete!<br />' +
	'- ¿De pequeña?<br />' +
	'- No, de salada',

	'El humor negro es como las piernas; hay quién tiene y quién no',

	'¿Qué es peor que encontrarse una cucaracha en el plato?<br />' +
	'Encontrarse media',

	'- Cariño, ¿me pasas el bebé?<br />' +
	'- Ahora, cuando llore<br />' +
	'- ¿Cuando llore? ¿Porque?<br />' +
	'- Porque no me acuerdo de donde lo he dejado<br />',

	'- Siento decirle que mi gato ha matado a su perro<br />' +
	'- ¿Mi perro? ¡Pero si es un doberman!<br />' +
	'- Ya, y mi gato hidráulico',

	'- Bienvenidos a su primera sesión matrimonial. Paco, empezemos por usted, ¿qué hace después de alcanzar el orgasmo?<br />' +
	'- Borrar el historial',

	'Ojo a cómo puede cambiar una frase con poner la coma o no ponerla:<br />' +
	'- Quiero que me ayude, señorita<br />' +
	'- Quiero que me la coma, señorita<br />',

	'- Cuando voy a donar sangre, no me la extraigo yo. Lo hace una enfermera<br />' +
	'- Ya pero esto es un banco de sémen<br />' +
	'- ¿Y?<br />' +
	'- ¡No le vamos a hacer ninguna paja!',

	'Le pedí que me hiciera guarradas en la cama...<br />' +
	'Se tiró un pedo y me tapo con la sábana',

	'- Escoja una carta sin que yo la vea, caballero<br />' +
	'- Ya<br />' +
	'- Enséñesela al público<br />' +
	'- Voy<br />' +
	'- ¡LA CARTA, ENSEÑE LA CARTA!<br />' +
	'- A ver si somos más específicos',

	'- Hija, ¿tú te drogas?<br />' +
	'- No, ¿por?<br />' +
	'- Porque estás picando la cebolla con la VISA',

	'- ¿Cuál es su destino?<br />' +
	'- No esta escrito aún, lo voy forjando con ánimo y perseverancia<br />' +
	'- ¿Quiere un billete de tren o no?',

	'- Cariño, ¿has visto a Gasol coger el rebote?<br />' +
	'- ¿Qué rebote?<br />' +
	'- El de mis huevos en tu cogote Jajajaja Hoy no follo, ¿verdad?<br />' +
	'- Ni mañana<br />',

	'- No eres tú, soy yo<br />' +
	'- Eso es que has activado la cámara frontal del móvil<br />' +
	'- Ah, pues sí',

	'- Merche, te ha llamado Almodóvar<br />' +
	'- ¡No jodas! ¿Para qué?<br />' +
	'- Para comprar el guión de la película que te montaste ayer<br />' +
	'- ¡Imbécil!<br />' +
	'- ¡Puta loca!',

	'- Chun Li, ¿verdad o prenda?<br />' +
	'- Verdad<br />' +
	'- ¿Dónde está el perro de María?<br />' +
	'- Prenda',

	'Llega tarde a un bukake y se lo echan en cara',

	'- Tenemos que dejar de vernos antes de que se entere mi mujer<br />' +
	'- Ponte las gafas, Paco<br />' +
	'- Hóstia qué movida...',

	'- Manolo, ¿cuál es la postura que más has usado para practicar sexo?<br />' +
	'- De rodillas y pidiéndolo por favor',

	'- Hola. Soy el vecino de arriba<br />' +
	'- Hola. ¿Qué querías?<br />' +
	'- Entiendo que estéis follando, pero ¿puedes decirle a tu mujer que no chille tanto?<br />' +
	'- Pero si yo estoy trabajando...<br />' +
	'- Ups',

	'- Ya estan los ordenadores actualizados<br />' +
	'- ¿Los has revisado todos?<br />' +
	'- Sí, jefe<br />' +
	'- ¿Uno por uno?<br />' +
	'- Uno',

	'Dicen que el chocolate es un sustituivo del sexo. He metido la polla en una taza de Paladin y estoy camino de urgencias...',

	'- ¿Cómo dejáis que vuestra madre os siga vestiendo iguales? Que tenéis bigote y pelos en los huevos, joder! Que ya tenéis una edad!<br />' +
	'- Caballero, baje del coche y sople aquí por favor',

	'- ¿Cómo te reconoceré?<br />' +
	'- Mirarás a uno y pensarás "Ay no, que no sea ése". Pues, ése',

	'- Vengo del urólogo<br />' +
	'- ¿Y qué te ha dicho?<br />' +
	'- Que soy gilipollas. Que los hurones se llevan al veterinario',

	'- Quiero despertar contigo el resto de mi vida<br />' +
	'- Me levanto a las 5 de la mañana<br />' +
	'- Pues va a ser que no',

	'- ¿Tú crees que soy feo?<br />' +
	'- Hombre, fuiste al puticlub y a todas les dolía la cabeza. Raro es',
	
	'- Alcánzame el eso que dejé allá adentro de aquello<br />' +
	'- ¿El qué?<br />' +
	'- Madre mía Paco, pareces tonto',
	
	'- En una escala del 1 al 10, ¿cómo valoraria su capacidad de comprensión?<br />' +
	'- Muy buena',
	
	'- No hay ni un pelo en tu camisa!<br />' +
	'- ¿Y...?<br />' +
	'- ¿Quien es esa puta calva?',
	
	'- Mi coche hace un ruido espantoso<br />' +
	'- ¿Ha probado usted a quitar el CD de Pablo Alborán?',
	
	'- ¿Tiene tarjetas de San Valentín que digan: "Para mi único y verdadero amor"?<br />' +
	'- Claro que tenemos!<br />' +
	'- Pués deme ocho por favor',
	
	'- ¿A partir de cuántas cervezas se puede considerar que tienes un problema?<br />' +
	'- Cuando no queda ninguna más',
	
	'Mi hijo es un sol; sale y se pone',
	
	'- El problema de la sociedad de hoy es la falta de empatía, de respeto, de sentido del humor. La intolerancia<br />' +
	'- ¿A la lactosa?<br />' +
	'- A tu puta madre',
	
	'Si fuera joyero,<br />' +
	'te regalaria una joya.<br />' +
	'Como soy pollero,<br />' +
	'no te cobro las patatas',
	
	'Cada vez que mi madre viene a casa y pregunta "¿Esto para qué es?" desde otra habitación, me da un microinfarto',
	
	'- Para continuar con la ceremonia, leed vuestros votos<br />' +
	'- Yo pensaba que era secreto<br />' +
	'- Es tu boda<br />' +
	'- Bueno... vale. Que bochorno. Voto no',
	
	'- Hoy he dejado el trabajo. No podia seguir trabajando para ese hombre despues de lo que me dijo<br />' +
	'- ¿Que te dijo?<br />' +
	'- Estas despedido',
	
	'- Yo una Cruzcampo<br />' +
	'- Yo una Heineken<br />' +
	'- Bueno, pues un agua para mí también',
	
	'- Yo quiero un Bitter Kas<br />' +
	'- Yo una cerveza sin alcohol<br />' +
	'- ¿Y usted?<br />' +
	'- Amigos normales',
	
	'- La morsa brama de placer mojándose en las gélidas aguas árticas<br />' +
	'- ¡Pepe, que le abras el agua caliente a mi madre!<br />' +
	'- Su cría se rebela',
	
	'- Un pájaro enjaulado no es un pájaro feliz...<br />' +
	'- Que te lo guardes, Paco',
	
	'Según un estudio, dejaremos de tener sexo en 2030. Yo he dejado de follar ya para que no me pille el toro',
	
	'Otro día más sin utilizar el mínimo común múltiplo ni el máximo común divisor',
	
	'La mejor viagra es cambiar de cabra',
	
	'ÚLTIMA HORA: Pide una pizza familiar y la devuelve porque no la conoce de nada',
	
	'- ¿Sabes el porcentaje de españoles que son bebedores empedernidos de cerveza?<br />' +
	'- No se, ¿un tercio?<br />' +
	'- Venga va, uno fresquito',
	
	'El día menos pensado dices "pues yo prefiero salir a mediodía y tomar unos vinitos por el centro". PUM, eres más viejo que una montaña.',

	'- El límite es el cielo<br />' +
	'- No, el límite es 0,25. Baje del coche por favor',
	
	'- ¿Qué hacen esos condones rotos en el jardín?<br />' +
	'- ¡QUE DEJES DE LLAMAR ASÍ A LOS NIÑOS, JOSÉ!',
	
	'He visto El Silencio de los Corderos y no se oye ni uno en toda la película. Buen trabajo',
	
	'Estoy flipando. Han detenido al mecánico de mi barrio por tráfico de drogas. Soy cliente suyo de toda la vida y nunca me había dicho que fuera mecánico',
	
	'Me he tirado un pedo en el autobús y se han girado 4 personas. Ha sido como participar en La Voz',
	
	'- Papá<br />' +
	'- Dime, hijo<br />' +
	'- ¿Qué es dudar?<br />' +
	'- A ver, tú a quién quieres más ¿a papá o a mamá?<br />' +
	'- A mamá<br />' +
	'- Pues que te lo explique ella, gilipollas',
	
	'- Pero ¿qué le ha hecho a su suegra?<br />' +
	'- Lo que me dijo, doctor<br />' +
	'- Le dije dar dos tranquilizantes, DAR-DOS, separado',
	
	'- Llevo un mes sin sexo por tener la muñeca rota<br />' +
	'- ¿La izquierda o la derecha?<br />' +
	'- La hinchable',
	
	'- Doctor, ¿qué me recomienda contra el dolor menstrual?<br />' +
	'- Sexo anal<br />' +
	'- Usted ha hablado con mi marido ¿verdad?<br />' +
	'- ¿Qué Paco ni que Paco?',
	
	'- ¿Cuánto tiempo hace que no follas?<br />' +
	'- ¿Que hora es?<br />' +
	'- Las 11:46<br />' +
	'- Nueve años',
	
	'- Señor, no queda viagra de 50mg. Le vamos a dar de 100mg para que la parta en dos<br />' +
	'- ¡¿A mi esposa?!<br />' +
	'- No, coño! La pastilla!',
	
	'- Vengo a matricularme a Ciencias Políticas<br />' +
	'- Muy bien. Coja este sobre...<br />' +
	'- ¡Ostias! ¿Ya?<br />' +
	'- Es la matricula inútil',
	
	'- Mi mujer siempre anda por casa como vino al mundo<br />' +
	'- ¿Desnuda?<br />' +
	'- No, gritando',
	
	'Fui a poner una denuncia. Primero me dan un boli que no escribe y luego uno que si. Que cabrones. El viejo truco boli malo boli bueno',
	
	'Cómo conquistar a un hombre en diez pasos:<br />' +
	'Desnúdate, da diez pasos hacia donde él esté y chúpasela como si no hubiera un mañana',
	
	'- Y tú ¿a qué te dedicas?<br />' +
	'- Soy bromista<br />' +
	'- ¿Te dedicas al humor?<br />' +
	'- No, produzco bromo elemental a partir de bromuro potásico<br />' +
	'- Ah, perdón<br />' +
	'- Es broma',
	
	'- ¿Te has cagado en el ascensor?<br />' +
	'- He escuchado "Planta uno" y me he liado',
	
	'- Tranquilo Santi, solo es un pequeño corte con el bisturí, no estés nervioso<br />' +
	'- Oiga doctor, yo me llamo Jorge<br />' +
	'- Ya lo sé, Santi soy yo',
	
	'- Paco, ¿te estás follando a la vecina del 5º?<br />' +
	'- Es la del 2º<br />' +
	'- ¿Que más da?<br />' +
	'- Pues que no te fijas en los detalles Puri, y esas cosas duelen',
	
	'Lo que en realidad buscan todos los hombres es una felación estable',
	
	'- Tengo que hacer una redacción de diez páginas sobre mi vida sexual<br />' +
	'- ¿Como lo llevas?<br />' +
	'- Mal... Voy a tener que meter mucha paja',
	
	'- Soy super saludable<br />' +
	'- ¿Comes sano y haces ejercicio?<br />' +
	'- No, mucha gente me saluda',
	
	'- ¿Cómo prepara el brocoli?<br />' +
	'- Lo tiro, y preparo un par de huevos fritos con chorizo<br />' +
	'- ¡Contratado!',
	
	'- Eres un poco corto<br />' +
	'- ¿Un poco qué? Cambio',
	
	'- ¡Ayer casi hago un trío! Se acercó una chica y me dijo: "Yo y mi amiga queremos follar contigo"<br />' +
	'- ¿Y tú que dijiste?<br />' +
	'- Será "Mi amiga y yo"',
	
	'- ¿Qué haces para estar tan delgada?<br />' +
	'- Follar mucho<br />' +
	'- Pues tu marido está bien gordo<br />' +
	'- Dicen que va a llover',
	
	'"Si después de besarla no tienes que acomodarte el rabo, no es la indicada"<br /><br />José de Espronceda',
	
	'Mi mayor rebeldía es colocar la compra en la cinta de la caja de tal forma que cuando me preguntan hasta dónde pueda responder: "Hasta los huevos"',
	
	'- Me encanta su reloj espía, señor Bond<br />' +
	'- En su pantalla puedo ver usted no lleva bragas<br />' +
	'- ¡No es cierto! Si que llevo<br />' +
	'- Es que va una hora adelantado',
	
	'- Control de alcoholemia. Sople<br />'+
	'- Eso es una polla<br />' +
	'- Ya. Pero así no dará positivo<br />' +
	'- Pues también es verdad',
	
	'He probado lo de usar el chocolate como sustitutivo del sexo, pero los Toblerones se me parten al metermelos por el culo',
	
	'- Que metal mas raro<br />' +
	'- Es estaño<br />' +
	'- ¿A que si?',
	
	'Explota una fábrica de pelucas en Murcia. La policia está peninando la zona',
	
	'Muere un hombre al estrellarse con un espejo. Se veía venir',
	
	'Una mujer cae al vacío mientras tendía la ropa. Se le fue la pinza',
	
	'Encontrar a tu media naranja es lo de menos. Lo importante es encontrar quien te la pele',
	
	'- Tu follas poco, ¿no?<br />' +
	'- Ojalá',

	'Ayer me enganché con un libro bueno, pero bueno BUENO, de los que marcan. Absorto estuve hasta las 4 de la madrugada, ahí, coloreando',

	'Yo a veces le devuelvo a mi madre tuppers de mi suegra, para que vea que tiene competencia y no se relaje',

	'- Camarero, un risotto<br />' +
	'- JOJOJO<br />' +
	'- Muchas gracias',

	'- Mañana tengo un examen de próstata y no he estudiado nada<br />' +
	'- Échale un ojo al índice aunque sea, es lo que suele entrar',

	'Tengo menos ganas de currar que el que le puso el nombre a "Panrico"',

	'- Te quiero mucho Soplaculo<br />' +
	'- Abuelaaaa! Me llamo Silvano!',

	'Lo más jodido de trabajar en equipo es convencer al resto de que no tienen ni puta idea',

	'- Mi novia ya no quiere hablar conmigo ni por teléfono<br />' +
	'- ¿Y te cuelga?<br />' +
	'- Hasta la rodilla, pero no es momento de presumir',

	'- Gracias a la bascula en el baño puedo saber cuanto pesa lo que cago<br />' +
	'- Claro, te pesas antes y despues<br />' +
	'- Ah! De esa forma es mejor',

	'- ¿Cómo se dice, fuera o fuese?<br />' +
	'- Da igual<br />' +
	'- Pues ponte bien el bañador que tienes un huevo fuese',

	'- Le he implantado un diente postizo<br />' +
	'- ¿Me lo puedo cepillar, doctor?<br />' +
	'- Por supuesto. Salgo a las ocho',

	'- Cago cada mañana a las 8, doctor<br />' +
	'- ¿Y cual es el problema?<br />' +
	'- Que me despierto a las 9',

	'- Papa, papa, tengo paperas<br />' +
	'- Pues cuando tengas pa putas me avisas<br />',

	'¿Que son tres burros debajo del mar? Un triburrón',

	'- ¡Ayúdeme! He perdido a mi hija<br />' +
	'- ¿Como se llama?<br />' +
	'- Esperanza<br />' +
	'- Eso es imposible! La esperanza es lo último que se pierde',

	'- Soy rockero<br />' +
	'- ¿Y tienes una banda?<br />' +
	'- No, junto piedras y las vendo',

	'- Que boca mas grande tienes abuelita<br />' +
	'- ¡Cinco pollas me caben!',

	'- ¿Tu no eras alérgico a los frutos secos?<br/>' +
	'- Si, ¿porque?<br/>' +
	'- Porque la tia con la que te liaste anoche tenia nuez<br/>' +
	'- ¡Ahora entiendo porque me pica el culo!',

	'Una cereza se mira al espejo y se pregunta \'¿Seré esa?\'',

	'Me dice el otro dia un tipo por la calle \'¡Quiero un hijo tuyo!\' Le traje al mayor, que es el que come más',

	'- ¿Sabe cómo se dice memoria en inglés?<br />' +
	'- Por supuesto. Memory<br />' +
	'- ¿Podria usarlo en una frase?<br />' +
	'- Claro! Ayer caí por la ventana y memory',

	'- ¿Qué es un tomate vestido con capa y antifaz?<br />' +
	'- Ni idea<br />' +
	'- El capitán tomate. Ahora, ¿qué es un cocodrilo vestido con capa y antifaz?<br />' +
	'- El capitán cocodrilo<br />' +
	'- No, es un cocodrilo disfrazado de capitán tomate',

	'- Cariño, cuéntale a mi madre lo que te hice ayer<br />' +
	'- ¿Lo de la espectacular mamada sin manos?<br />' +
	'- No! El arroz con leche, gilipollas',

	'- Dice que sabe de historia del arte<br />' +
	'- Soy un experto<br />' +
	'- ¿Qué opina del Renacimiento?<br />' +
	'- Que es imposible. Si te mueres, te mueres',

	'- Estas obsesionado con las especias<br />' +
	'- No digas tonerías, Romero<br />' +
	'- Ramiro<br />' +
	'- Eso',

	'- No sé si es buena idea hacerlo en la cama de tus padres<br />' +
	'- ¿Por qué?<br />' +
	'- Porque los vamos a despertar',

	'- Empezemos con la entrevista. ¿Tiene usted experiencia?<br />' +
	'- Por supuesto. Con esta ya van 20',

	'- ¿Sabe cómo se dice fiesta en inglés?<br />' +
	'- Por supuesto. Party<br />' +
	'- ¿Podria usarlo en una frase?<br />' +
	'- Claro! Ayer me party los dientes con la bicicleta',

	'- Mama, ¿porqué me llamo Claudio?<br />' +
	'- Por qué yo me llamo Claudia<br />' +
	'- Pues menos mal que no te llamas Ana',

	'- ¿Tienes WiFi?<br />' +
	'- Si<br />' +
	'- Y ¿cuál es la clave?<br />' +
	'- Tener dinero y pagarlo',

	'- Papá, ¿qué es depilar?<br />' +
	'- No sé, hace tiempo que no la veo',

	'- Madre mía, como tienes las vacas en el establo, mezcladas de cualquier manera<br />' +
	'- Sí, están un poco desordeñadas',

	'- Bienvenidos al curso de relajación<br />' +
	'- ¡Empezad ya, hostias!',

	'- ¿Hay algún doctor en la sala?<br />' +
	'- Presente! Especializado en Matemáticas<br />' +
	'- ¡Rápido doctor, mi amigo se se muere!<br />' +
	'- Pues uno menos',

	'- ¿Cómo se dice Un zapato en inglés?<br />' +
	'- A shoe<br />' +
	'- Salud Jajaja',

	'- ¿Balias, guapo?<br />' +
	'- No<br />' +
	'- Perfecto. Sujétame el cubata que esto es un temazo',

	'La rencarnación tiene que existir, porque ciertos niveles de retraso no se acumulan en una sola vida ni de coña',

	'Mi mujer insiste en que use la escobilla del vater, pero voy a volver al papel, tengo el culo en carne vive',

	'- Después del divorcio hemos dividio la casa en dos partes<br />' +
	'- ¿Y qué parte te ha tocado?<br />' +
	'- La de fuera',

	'- Dice mamá que estas obsesionado con el móvil<br />' +
	'- Cállate Alfonsiete',

	'- Cuando alguien me dice un cumplido, me apetece follarmelo. ¿Que cree que tengo, doctor?<br />' +
	'- Creo que tiene usted unos ojos preciosos',

	'- Hijo, la cigüeña te va a traer un hermanito<br />' +
	'- ¿La cigüena? Joder papá, si es que te follas todo lo que pillas'
];

const getFilteredJokes = text =>
	jokes.filter(joke => text && joke.toLowerCase().indexOf(text.toLowerCase()) > -1);

const getRandomJoke = excludedIndexes => {
	var randomNumber = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
	var index = randomNumber % jokes.length;
	
	if (excludedIndexes.length === jokes.length) {
		excludedIndexes.length = 0;
	}
	while(excludedIndexes.indexOf(index) > -1) {
		index = ++index % jokes.length;
	}
	
	excludedIndexes.push(index);
	return jokes[index];
};

module.exports = {
	getFilteredJokes,
	getRandomJoke
};
