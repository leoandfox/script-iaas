
/* Script IAAS */
const readline = require('readline');
var readlineSync = require('readline-sync');
//const execSync = require('child_process').execSync;
const { exec, spawn } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



main();

function main()
{
    //exec('');
    exec('powershell ./connect-vcenter.ps1', async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            main();
            return;
        }
        console.log(stdout);
        displayMenu();
        chooseOptionOnMenu();
    });
    
}

function displayMenu(){
    console.log("");
    console.log("");
    console.log("****************************** Bienvenue sur la plateforme IAAS DE CLOUDIS ************************");
    console.log("");
    console.log("--> MENU PRINCIPAL");
    console.log("");
    console.log("0- Ajouter Un client");
    console.log("1- Voir le status d'une Machine Virtuelle d'un Client");
    console.log("2- Supprimer une machine virtuelle");
    console.log("3- Redémarrer une machine virtuelle");
    console.log("4- Créer une machine virtuelle pour un client");
    console.log("5- Quitter");
    console.log("");
}


function chooseOptionOnMenu(){
    rl.question('Choisissez une option ? ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Votre choix:  ${answer}`);
        GoToOptionOfMenu(answer);
        //rl.close();
    });
}

async function GoToOptionOfMenu(answer){
    clearScreen();
    console.log("")
    switch (answer) {
        case "0":
        console.log("--> Création d'un Client");
        await addCustomer();       
        break;
        case "1":
        console.log("--> Afficher le status des machines virtuelles d'un client");
        console.log("")
        exec('powershell ./list-user.ps1 ', async (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                main();
                return;
            }
            console.log(stdout);
            let customerChoosen = await takeInputOfUser('Choisissez un client : ');
            exec('powershell ./display-vm-customer.ps1 -username '+customerChoosen, async (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    main();
                    return;
                }
                console.log(stdout);
                let vmchoosen4 = await takeInputOfUser('Choisissez la vm : ');
                exec('powershell ./display-detail-vm.ps1 -username '+customerChoosen+" -name "+vmchoosen4, async (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        main();
                        return;
                    }
                    console.log(stdout);
                    await takeInputOfUser("Appuyez sur Entrée pour retourner au menu principal...");
                    main();
                    //let customerChoosen = await takeInputOfUser('Choisissez la vm : ');
                    //main();
                });
                //main();
            });
        });
       /* exec('powershell ./list-user.ps1 ', async (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
            console.log("");
            let customerChoosen = await takeInputOfUser('Choisissez un client : ');
            displayVmOfCustomer(customerChoosen);
            let nextStep = await takeInputOfUser("(A) pour retourner à l'accueil et (L) pour lister à nouveaux les clients : ");
            switch (nextStep) {
                case "A":
                main();
                break;
                case "L":
                GoToOptionOfMenu("1");
                break;
                default:
                console.log("Aucune action possible pour votre entrée");
                break;
            }
        });*/
        break;
        case "2":
        console.log("--> Supprimer une machine virtuelle");
        console.log("")
        exec('powershell ./list-user.ps1 ', async (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                main();
                return;
            }
            console.log(stdout);
            let customerChoosen = await takeInputOfUser('Choisissez un client : ');
            exec('powershell ./display-vm-customer.ps1 -username '+customerChoosen, async (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    main();
                    return;
                }
                console.log(stdout);
                let vmchoosen5 = await takeInputOfUser('Choisissez la vm : ');
                exec('powershell ./delete-vm.ps1 -username '+customerChoosen+" -name "+vmchoosen5, async (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        main();
                        return;
                    }
                    console.log(stdout);
                    await takeInputOfUser("Appuyez sur Entrée pour retourner au menu principal...");
                    main();
                    //let customerChoosen = await takeInputOfUser('Choisissez la vm : ');
                    //main();
                });
                //main();
            });
        });
        break;
        case "3":
        console.log("--> Redémarrer une machine virtuelle");
        console.log("")
        exec('powershell ./list-user.ps1 ', async (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                main();
                return;
            }
            console.log(stdout);
            let customerChoosen = await takeInputOfUser('Choisissez un client : ');
            exec('powershell ./display-vm-customer.ps1 -username '+customerChoosen, async (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    main();
                    return;
                }
                console.log(stdout);
                let vmchoosen6 = await takeInputOfUser('Choisissez la vm : ');
                exec('powershell ./restart-vm.ps1 -namevm '+vmchoosen6, async (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        main();
                        return;
                    }
                    console.log(stdout);
                    await takeInputOfUser("Appuyez sur Entrée pour retourner au menu principal...");
                    main();
                    //let customerChoosen = await takeInputOfUser('Choisissez la vm : ');
                    //main();
                });
                //main();
            });
        });
        break;
        case "4":
        console.log("--> Création d'une machine virtuelle");
        exec('powershell ./list-user.ps1 ', async (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                main();
                return;
            }
            console.log(stdout);
            let customerChoosen = await takeInputOfUser('Choisissez un client : ');
            let nameVm = await takeInputOfUser('Nom de la machine virtuelle: ');
            let ipVm = await takeInputOfUser('Ip: ');
            let templateVm;
            //displayTemplateVm();
            exec('powershell  ./display-vm-template.ps1', async (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    main();
                    return;
                }
                console.log(stdout);
                templateVm = await takeInputOfUser('Template Vm à utiliser : ');
                console.log("Création de la vm pour le client ....")
                exec('powershell ./create-vm.ps1 -templatevm '+templateVm+' -vmname '+nameVm+' -username '+ customerChoosen, async (err, stdout, stderr) => {
                    if (err) {
                        console.log("Une erreur s'est produite. Merci de réessayer !")
                        console.log(err);
                        return;
                    }
                    console.log(stdout);
                    await takeInputOfUser('Appuyez sur Entrée pour retourner au menu principal...');
                    main();
                   // break;
                });
            });
        });
          
        break; 
        case "5":
        console.log("Merci pour votre visite ! ");
        rl.close();
        break; 
        default:
        console.log(" Votre choix ne correspond à aucune option !");
        console.log(" Retour au Menu principal");
        main();
        break;
    }
    
}

function clearScreen()
{
    process.stdout.write('\033c');
}
function takeInputOfUser(theQuestion) {
    return new Promise(resolve => rl.question(theQuestion, answ => resolve(answ)))
}
async function addVm(){
    //let test = await rl.question("Essayons de prendre test: ");
    displayCustomers();
    let customerChoosen = await takeInputOfUser('Choisissez un client : ');
    let nameVm = await takeInputOfUser('Nom de la machine virtuelle: ');
    let ipVm = await takeInputOfUser('Ip: ');
    let templateVm;
    //displayTemplateVm();
    let confirm;
    exec('powershell  ./display-vm-template.ps1', async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            main();
            return;
        }
        console.log(stdout);
        templateVm = await takeInputOfUser('Template Vm à utiliser : ');
        console.log("Création de la vm pour le client ....")
        exec('powershell ./create-vm.ps1 -templatevm '+templateVm+' -vmname '+nameVm+' -username '+ customerChoosen, async (err, stdout, stderr) => {
            if (err) {
                console.log("Une erreur s'est produite. Merci de réessayer !")
                console.log(err);
                main();
                return;
            }
            console.log(stdout);
            await takeInputOfUser('Appuyez sur Entrée pour retourner au menu principal...');
            main();
           // break;
        });
    });
    
    
    
}
async function addCustomer(){
    //let test = await rl.question("Essayons de prendre test: ");
    let username = await takeInputOfUser('Username du client : ');
    //let firstname = await takeInputOfUser('Prénom du client : ');
    //let lastname = await takeInputOfUser('Nom du client : ');   
    //let confirm = await takeInputOfUser('Ces informations sont elles exactes (O)/(N): ');
    exec('powershell ./create-user.ps1 -username '+username, async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            main();
            return;
        }
        console.log(stdout);
        await takeInputOfUser('Appuyez sur Entrée pour retourner au menu principal...');
        main();
    });
    
    /*switch (confirm) {
        case "O":
        console.log("Création du client ....")
        await takeInputOfUser('Client crée ! Appuyez sur Entrée pour retourner au menu principal...');
        break;
        case "N":
        await takeInputOfUser('Annulation de la création du client ! Appuyez sur Entrée pour retourner au menu principal...');
        break;
        default:
        await takeInputOfUser('Saisi incorrect ! Appuyez sur Entrée pour retourner au menu principal...');
        break;
    }*/
    
}
function displayCustomers(){
    console.log("---- ALL CUSTOMERS ----");
    console.log("***********************");
    exec('powershell ./list-user.ps1 ', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            main();
            return;
        }
        console.log(stdout);
    });
}

function displayVmOfCustomer(customer){
    console.log("Display VM for customer "+customer);
    
}

function listVmOfCustomerWithoutDetail(customer)
{
    console.log("List VM without detail for customer "+customer);
}
function listVmPoweredOfCustomerWithoutDetail(customer)
{
    console.log("List VM Powered without detail for customer "+customer);
}
function displayTemplateVm()
{
    console.log("");
    console.log("--> Display Vm template");
    console.log("");
    exec('powershell  ./display-vm-template.ps1', async (err, stdout, stderr) => {
        
        if (err) {
            console.error(err);
            main();
            return;
        }
        console.log(stdout);
    });
}
