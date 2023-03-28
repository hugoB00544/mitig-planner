import { Buff } from "../Controller/Buff.ts";
import { Skill } from "../Controller/Skill.ts";
import { Job } from "../Controller/Job.ts";

export function initialise() {

    //Tank actions
    const BReprisal = new Buff(0,0,10,10,0,10,60,1,true,false,"Reprisal","https://xivapi.com/i/013000/013901.png",false);
    const BRampart = new Buff(0,0,20,20,0,20,90,1,false,false,"Rampart","https://xivapi.com/i/010000/010152.png",false);
    let Reprisal = new Skill("Reprisal","https://img.finalfantasyxiv.com/lds/d/6b83d9368623d5cd20a426d26916021b59a14963.png");
    Reprisal.addBuff(BReprisal);
    let Rampart = new Skill("Rampart","https://img.finalfantasyxiv.com/lds/d/37546679ae5e431c0903b20fa2c91a88c5a8e001.png");
    Rampart.addBuff(BRampart);


    //Setup PLD
    let PLD = new Job("PLD", "https://img.finalfantasyxiv.com/lds/promo/h/V/NUXU4h6iXzF8HS4BxHKYf7vOa0.png",108484, 126,1844,3055,2.50);
    const BDivine_Veil = new Buff(0,10,0,0,0,30,90,1,true,false,"Divine Veil","https://assets.rpglogs.com/img/ff/abilities/012000-012509.png",false);
    const BSentinel = new Buff(0,0,30,30,0,15,120,1,false,false,"Sentinel","https://assets.rpglogs.com/img/ff/abilities/010000-010151.png",false);
    const BPassage_of_Arms = new Buff(0,0,0,0,100,18,120,1,false,false,"Passage of Arms","https://xivapi.com/i/012000/012512.png",false);
    const BArms_Up = new Buff(0,0,15,15,0,18,120,1,true,false,"Arms Up","https://assets.rpglogs.com/img/ff/abilities/012000-012513.png",false);
    const BIntervention_Knight_s_Resolve = new Buff(0,0,10,10,0,4,10,1,false,true,"Knight's Resolve (Intervention)","https://assets.rpglogs.com/img/ff/abilities/012000-012516.png",false);
    const BHoly_Sheltron_Knight_s_Resolve = new Buff(0,0,15,15,0,4,10,1,false,true,"Knight's Resolve (Holy Sheltron)","https://assets.rpglogs.com/img/ff/abilities/012000-012516.png",false);
    const BIntervention = new Buff(0,0,10,10,0,8,10,1,false,false,"Intervention","https://assets.rpglogs.com/img/ff/abilities/012000-012511.png",false);
    const BHoly_Sheltron  = new Buff(0,0,15,15,0,8,5,1,false,false,"Holy Sheltron ","https://assets.rpglogs.com/img/ff/abilities/012000-012515.png",false);
    let Divine_Veil = new Skill("Divine Veil","https://img.finalfantasyxiv.com/lds/d/495faab61344751872ca0867e2d5e59b04c6940c.png");
    Divine_Veil.addBuff(BDivine_Veil);
    let Sentinel = new Skill("Sentinel","https://img.finalfantasyxiv.com/lds/d/913eb4344bb6c8710f250115fa22484b026f08bd.png");
    Sentinel.addBuff(BSentinel);
    let Passage_of_Arms = new Skill("Passage of Arms","https://img.finalfantasyxiv.com/lds/d/b570dfda793945b3bb8fddef02b1a865b8a04b32.png");
    Passage_of_Arms.addBuff(BPassage_of_Arms);
    Passage_of_Arms.addBuff(BArms_Up);
    let Intervention = new Skill("Intervention","https://img.finalfantasyxiv.com/lds/d/fdb9b8347b33dae63e25debeab15aa75c270f39a.png");
    Intervention.addBuff(BIntervention);
    Intervention.addBuff(BIntervention_Knight_s_Resolve);
    let Holy_Sheltron = new Skill("Holy Sheltron","https://img.finalfantasyxiv.com/lds/d/c856abb6dac68e4bfd6cbb98b309360cb6162ced.png");
    Holy_Sheltron.addBuff(BHoly_Sheltron);
    Holy_Sheltron.addBuff(BHoly_Sheltron_Knight_s_Resolve);
    PLD.addSkill(Reprisal);
    PLD.addSkill(Rampart);
    PLD.addSkill(Divine_Veil);
    PLD.addSkill(Sentinel);
    PLD.addSkill(Passage_of_Arms);
    PLD.addSkill(Intervention);
    PLD.addSkill(Holy_Sheltron);

    //Setup WAR
    let WAR = new Job("WAR", "https://img.finalfantasyxiv.com/lds/promo/h/0/U3f8Q98TbAeGvg_vXiHGOaa2d4.png",108634,126,1844,3055,2.50);
    const BShake_It_Off = new Buff(0,15,0,0,0,30,90,1,true,false,"Shake It Off","https://assets.rpglogs.com/img/ff/abilities/012000-012557.png",false);
    const BVengeance = new Buff(0,0,30,30,0,15,120,1,false,false,"Vengeance","https://xivapi.com/i/010000/010256.png",false);
    const BBloodwhetting = new Buff(0,0,10,10,0,8,25,1,false,false,"Bloodwhetting","https://assets.rpglogs.com/img/ff/abilities/012000-012562.png",false);
    const BStem_the_Flow = new Buff(0,0,10,10,0,4,25,1,false,false,"Stem the Flow","https://assets.rpglogs.com/img/ff/abilities/012000-012563.png",false);
    const BStem_the_Tide = new Buff(400,0,0,0,0,20,25,1,false,false,"Stem the Tide","https://assets.rpglogs.com/img/ff/abilities/012000-012564.png",false);
    let Shake_It_Off = new Skill("Shake It Off","https://img.finalfantasyxiv.com/lds/d/f71e2c46512c1e937c0ff316be668d853869c637.png");
    Shake_It_Off.addBuff(BShake_It_Off);
    let Vengeance = new Skill("Vengeance","https://img.finalfantasyxiv.com/lds/d/72a939d0010304553c5b88fae576f5a25f453e10.png");
    Vengeance.addBuff(BVengeance);
    let Bloodwhetting = new Skill("Bloodwhetting","https://img.finalfantasyxiv.com/lds/d/439c677f7cd4da8e9be9b92245865d2eb1ebceca.png");
    Bloodwhetting.addBuff(BBloodwhetting);
    Bloodwhetting.addBuff(BStem_the_Flow);
    Bloodwhetting.addBuff(BStem_the_Tide);
    WAR.addSkill(Reprisal);
    WAR.addSkill(Rampart);
    WAR.addSkill(Shake_It_Off);
    WAR.addSkill(Vengeance);
    WAR.addSkill(Bloodwhetting);

    //Setup DRK
    let DRK = new Job("DRK", "https://img.finalfantasyxiv.com/lds/promo/h/9/5JT3hJnBNPZSLAijAF9u7zrueQ.png",108484,126,1844,3055,2.50);
    const BDark_Missionary = new Buff(0,0,0,10,0,15,90,1,true,false,"Dark Missionary","https://xivapi.com/i/013000/013122.png",false);
    const BDark_Mind = new Buff(0,0,0,20,0,10,60,1,false,false,"Dark Mind","https://xivapi.com/i/013000/013114.png",false);
    const BShadow_Wall = new Buff(0,0,30,30,0,15,120,1,false,false,"Shadow Wall","https://xivapi.com/i/013000/013113.png",false);
    const BThe_Blackest_Night = new Buff(0,25,0,0,0,7,15,1,false,true,"The Blackest Night","https://xivapi.com/i/013000/013118.png",false);
    const BOblation = new Buff(0,0,10,10,0,10,60,2,false,true,"Oblation","https://xivapi.com/i/013000/013123.png",false);
    let Dark_Missionary = new Skill("Dark Missionary","https://img.finalfantasyxiv.com/lds/d/1dc1a1d830e5355e2cd251531e85932c24ba1b8d.png");
    Dark_Missionary.addBuff(BDark_Missionary);
    let Dark_Mind = new Skill("Dark Mind","https://img.finalfantasyxiv.com/lds/d/adb1f756a8cfa746f5ec2f97e487e41c06026a61.png");
    Dark_Mind.addBuff(BDark_Mind);
    let Shadow_Wall = new Skill("Shadow Wall","https://img.finalfantasyxiv.com/lds/d/7ea7904a9e066bb33d542755b5984ad78c711a45.png");
    Shadow_Wall.addBuff(BShadow_Wall);
    let The_Blackest_Night = new Skill("The Blackest Night","https://img.finalfantasyxiv.com/lds/d/f82c8fbcd6549c8cd72108a937aade172f8b98a8.png");
    The_Blackest_Night.addBuff(BThe_Blackest_Night);
    let Oblation = new Skill("Oblation","https://img.finalfantasyxiv.com/lds/d/5a42ca000eb7ab0c80e3952539ed260af3d4c5e8.png");
    Oblation.addBuff(BOblation);
    DRK.addSkill(Reprisal);
    DRK.addSkill(Rampart);
    DRK.addSkill(Dark_Missionary);
    DRK.addSkill(Dark_Mind);
    DRK.addSkill(Shadow_Wall);
    DRK.addSkill(The_Blackest_Night);
    DRK.addSkill(Oblation);

    //Setup GNB
    let GNB = new Job("GNB", "https://img.finalfantasyxiv.com/lds/promo/h/8/fc5PYpEFGrg4qPYDq_YBbCy1X0.png",108484,126,1844,3055,2.50);
    const BNebula = new Buff(0,0,30,30,0,15,120,1,false,false,"Nebula","https://xivapi.com/i/013000/013604.png",false);
    const BHeart_of_Light = new Buff(0,0,0,10,0,15,90,1,true,false,"Heart of Light","https://xivapi.com/i/013000/013609.png",false);
    const BBrutal_Shell  = new Buff(200,0,0,0,0,30,0,1,false,false,"Brutal Shell","https://xivapi.com/i/013000/013614.png",false);
    const BHeart_of_Corundum = new Buff(0,0,15,15,0,8,25,1,false,true,"Heart of Corundum","https://xivapi.com/i/013000/013615_hr1.png",false);
    const BClarity_of_Corundum = new Buff(0,0,15,15,0,4,25,1,false,true,"Clarity of Corundum","https://xivapi.com/i/013000/013617_hr1.png",false);
    const BCamouflage = new Buff(0,0,10,10,50,20,90,1,false,false,"Camouflage","https://xivapi.com/i/013000/013602.png",false);
    let Nebula = new Skill("Nebula","https://img.finalfantasyxiv.com/lds/d/d16438334b399cb5524acb6d77485b6c56a2be4a.png");
    Nebula.addBuff(BNebula);
    let Heart_of_Light = new Skill("Heart of Light","https://img.finalfantasyxiv.com/lds/d/04bbce4afc048a15cdccdd0495e679f90b115963.png");
    Heart_of_Light.addBuff(BHeart_of_Light);
    let Brutal_Shell  = new Skill("Brutal Shell","https://img.finalfantasyxiv.com/lds/d/729d76d5161a59cbed8b5f369e8476acf5ea24b2.png");
    Brutal_Shell.addBuff(BBrutal_Shell);
    let Heart_of_Corundum  = new Skill("Heart of Corundum","https://img.finalfantasyxiv.com/lds/d/493de7202ca9b1e4bed75fdd4e5b1e7a8c61d58a.png");
    Heart_of_Corundum.addBuff(BHeart_of_Corundum);
    Heart_of_Corundum.addBuff(BClarity_of_Corundum);
    let Camouflage = new Skill("Camouflage","https://img.finalfantasyxiv.com/lds/d/62855107ef85d3d74b0eb9d14f030368ddb6ff5a.png");
    Camouflage.addBuff(BCamouflage);
    GNB.addSkill(Reprisal);
    GNB.addSkill(Rampart);
    GNB.addSkill(Nebula);
    GNB.addSkill(Heart_of_Light);
    GNB.addSkill(Brutal_Shell);
    GNB.addSkill(Heart_of_Corundum);
    GNB.addSkill(Camouflage);


    //Setup WHM
    let WHM = new Job("WHM", "https://img.finalfantasyxiv.com/lds/promo/h/G/Na619RGtVtbEvNn1vyFoSlvZ84.png",68444,126,1792,3092,2.42);
    const BDivine_Benison = new Buff(500,0,0,0,0,15,30,2,false,true,"Divine Benison","https://xivapi.com/i/012000/012632.png",false);
    const BTemperance = new Buff(0,0,10,10,0,20,120,1,true,false,"Temperance","https://xivapi.com/i/012000/012634.png",false);
    const BAquaveil = new Buff(0,0,15,15,0,8,60,1,false,true,"Aquaveil","https://xivapi.com/i/012000/012638.png",false);
    let Divine_Benison = new Skill("Divine Benison","https://img.finalfantasyxiv.com/lds/d/065d9df35159a3bc53d59984a18b35581b442a73.png");
    Divine_Benison.addBuff(BDivine_Benison);
    let Temperance = new Skill("Temperance","https://img.finalfantasyxiv.com/lds/d/78e099cba536b64fe978d05487c51b28a66f29df.png");
    Temperance.addBuff(BTemperance);
    let Aquaveil = new Skill("Aquaveil","https://img.finalfantasyxiv.com/lds/d/f87f8e18282665458cc9c358ff1a2b8a78833491.png");
    Aquaveil.addBuff(BAquaveil);
    WHM.addSkill(Divine_Benison);
    WHM.addSkill(Temperance);
    WHM.addSkill(Aquaveil);

    //Setup AST
    let AST = new Job("AST", "https://img.finalfantasyxiv.com/lds/promo/h/E/g7JY4S1D-9S26VarEuIkPGIrFM.png",67909,126,1750,3077,2.31);
    const BCollective_Unconscious = new Buff(0,0,10,10,0,18,60,1,true,false,"Collective Unconscious","https://xivapi.com/i/013000/013227.png",false);
    const BIntersection = new Buff(400,0,0,0,0,30,30,2,false,true,"Intersection","https://xivapi.com/i/013000/013250.png",false);
    const BNeutral_Sect = new Buff(0,0,0,0,0,20,120,1,true,false,"Neutral Sect","https://xivapi.com/i/013000/013253.png",false);
    const BAspect_Benefic = new Buff(625,0,0,0,0,30,0,1,false,true,"Aspect Benefic","https://xivapi.com/i/013000/013253.png",false);
    const BAspect_Helios = new Buff(312.5,0,0,0,0,30,0,1,true,false,"Aspect Helios","https://xivapi.com/i/013000/013253.png",false);
    const BExaltation = new Buff(0,0,10,10,0,8,60,1,false,true,"Exaltation","https://xivapi.com/i/013000/013262.png",false);
    let Collective_Unconscious = new Skill("Collective Unconscious","https://img.finalfantasyxiv.com/lds/d/6ffe2bab0c77721314aee02e2f3f14f61351e2a4.png");
    Collective_Unconscious.addBuff(BCollective_Unconscious);
    let Celestial_Intersection = new Skill("Celestial Intersection","https://img.finalfantasyxiv.com/lds/d/2a71645e6880d0bb4b46332fd64cd0756dd3b08f.png");
    Celestial_Intersection.addBuff(BIntersection);
    let Neutral_Sect = new Skill("Neutral Sect","https://img.finalfantasyxiv.com/lds/d/8ccf71b513276dce09f58889b5bb8878371b8519.png");
    Neutral_Sect.addBuff(BNeutral_Sect);
    let Aspect_Benefic = new Skill("Aspect Benefic","https://img.finalfantasyxiv.com/lds/d/9abd9dc20f6f0864806e050841e5ae74172d3d93.png");
    Aspect_Benefic.addBuff(BAspect_Benefic);
    let Aspect_Helios = new Skill("Aspect Helios","https://img.finalfantasyxiv.com/lds/d/ee92429fd70cd18d445735da357c023336da994d.png");
    Aspect_Helios.addBuff(BAspect_Helios);
    let Exaltation = new Skill("Exaltation","https://img.finalfantasyxiv.com/lds/d/c4bf5c769353b2ee48cba7af8c64a86f1bb11e7d.png");
    Exaltation.addBuff(BExaltation);
    AST.addSkill(Collective_Unconscious);
    AST.addSkill(Celestial_Intersection);
    AST.addSkill(Neutral_Sect);
    AST.addSkill(Aspect_Benefic);
    AST.addSkill(Aspect_Helios);
    AST.addSkill(Exaltation);


    //Setup SCH
    let SCH = new Job("SCH", "https://img.finalfantasyxiv.com/lds/promo/h/s/2r8fm3U0Io7Pw1XT1tvnjPthp4.png",68395,126,1523,3096,2.40);
    const BGalvanize = new Buff(540,0,0,0,0,30,0,1,false,true,"Galvanize","https://assets.rpglogs.com/img/ff/abilities/012000-012801.png",false);
    const BSuccor = new Buff(320,0,0,0,0,30,0,1,true,false,"Succor","https://assets.rpglogs.com/img/ff/abilities/012000-012801.png",false);
    const BDesperate_Measures = new Buff(0,0,10,10,0,20,120,1,true,false,"Desperate Measures","https://assets.rpglogs.com/img/ff/abilities/012000-012816.png",false);
    const BSeraphic_Veil = new Buff(180,0,0,0,0,30,0,1,false,true,"Seraphic Veil","https://assets.rpglogs.com/img/ff/abilities/012000-012848.png",false);
    const BFey_Illumination = new Buff(0,0,0,5,0,20,120,1,true,false,"Fey Illumination","https://assets.rpglogs.com/img/ff/abilities/012000-012828.png",false);
    const BSacred_Soil = new Buff(0,0,10,10,0,15,30,1,true,false,"Sacred Soil","https://assets.rpglogs.com/img/ff/abilities/012000-012803.png",false);
 //   const BCatalyze = new Buff(540,0,0,0,0,30,0,1,false,true,"Catalyze","https://assets.rpglogs.com/img/ff/abilities/012000-012814.png",false);
    let Adloquium = new Skill("Adloquium","https://img.finalfantasyxiv.com/lds/d/07beea4eb1cc3f24533d045db5b694c939f3a3ac.png");
    Adloquium.addBuff(BGalvanize);
    let Expedient = new Skill("Expedient","https://img.finalfantasyxiv.com/lds/d/b9eb7f8aed74850abe24b753549fc676af9db2c8.png");
    Expedient.addBuff(BDesperate_Measures);
    let Seraphic_Veil = new Skill("SeraphicVeil","https://img.finalfantasyxiv.com/lds/d/07f1ba0fbda8b1b69078795da3932089e055e10d.png");
    Seraphic_Veil.addBuff(BSeraphic_Veil);
    let Fey_Illumination = new Skill("Fey Illumination","https://img.finalfantasyxiv.com/lds/d/6ed1ace8e31760fa3b042e6d27dac669668196b0.png");
    Fey_Illumination.addBuff(BFey_Illumination);
    let Sacred_Soil = new Skill("Sacred Soil","https://img.finalfantasyxiv.com/lds/d/4c47bdf94dc6c3dcd9b303cfa42a08a5cfd13629.png");
    Sacred_Soil.addBuff(BSacred_Soil);
    let Succor = new Skill("Succor","https://img.finalfantasyxiv.com/lds/d/59ca7d9f2002ba3176f070a023bcfd8fa2129fb9.png");
    Succor.addBuff(BSuccor);
    SCH.addSkill(Adloquium);
    SCH.addSkill(Expedient);
    SCH.addSkill(Seraphic_Veil);
    SCH.addSkill(Fey_Illumination);
    SCH.addSkill(Sacred_Soil);
    SCH.addSkill(Succor);

    //Setup SGE
    let SGE = new Job("SGE", "https://img.finalfantasyxiv.com/lds/promo/h/e/G0lQTD01LdCGk5pECSc7fbbmbM.png",68444,126,1900,3093,2.42);
    const BEukrasian_Prognosis = new Buff(320,0,0,0,0,30,0,1,true,false,"Eukrasian Prognosis","https://xivapi.com/i/012000/012954.png",false);
    const BKerachole = new Buff(0,0,10,10,0,15,30,1,true,false,"Kerachole","https://xivapi.com/i/012000/012964.png",false);
    const BHolos_shield = new Buff(300,0,0,0,0,30,120,1,true,false,"Holos (shield)","https://assets.rpglogs.com/img/ff/abilities/012000-012972.png",false);
    const BHolos_mitig = new Buff(0,0,10,10,0,20,120,1,true,false,"Holos (mitig)","https://assets.rpglogs.com/img/ff/abilities/012000-012971.png",false);
    const BPanhaimatinon = new Buff(200,0,0,0,0,15,120,1,true,false,"Panhaimatinon","https://xivapi.com/i/017000/017355.png",false);
    const BHaimatinon = new Buff(300,0,0,0,0,15,120,1,false,true,"Haimatinon","https://xivapi.com/i/017000/017585.png",false);
    const BEukrasian_Diagnosis = new Buff(540,0,0,0,0,30,0,1,false,true,"Eukrasian Diagnosis","https://xivapi.com/i/012000/012954.png",false);
 //   const BDifferential_Diagnosis = new Buff(540,0,0,0,0,30,0,1,false,true,"Differential Diagnosis","https://xivapi.com/i/012000/012955.png",false);
    const BTaurochole = new Buff(0,0,10,10,0,15,42,1,false,true,"Taurochole","https://xivapi.com/i/012000/012965.png",false);
    let Eukrasian_Prognosis = new Skill("Eukrasian Prognosis","https://img.finalfantasyxiv.com/lds/d/723cccd2fe9542159daffcd22f44ff52d8a2f6a1.png");
    Eukrasian_Prognosis.addBuff(BEukrasian_Prognosis);
    let Kerachole = new Skill("Kerachole","https://img.finalfantasyxiv.com/lds/d/b49859cbf63de26b230527650742576590166760.png");
    Kerachole.addBuff(BKerachole);
    let Holos = new Skill("Holos","https://img.finalfantasyxiv.com/lds/d/810d7969914bee1bbf088a70d62d6578a0949f9e.png");
    Holos.addBuff(BHolos_mitig);
    Holos.addBuff(BHolos_shield);
    let Panhaima = new Skill("Panhaima","https://img.finalfantasyxiv.com/lds/d/f7bdefbdd3410f2dd4b5c0f36e74ee72b115ccda.png");
    Panhaima.addBuff(BPanhaimatinon);
    let Haima = new Skill("Haima","https://img.finalfantasyxiv.com/lds/d/31657e2f5ec2ec375960c927a6ed532883d8d271.png");
    Haima.addBuff(BHaimatinon);
    let Eukrasian_Diagnosis = new Skill("Eukrasian Diagnosis","https://img.finalfantasyxiv.com/lds/d/0a0085828964c504f045a98b67feaf6c26c2307d.png");
    Eukrasian_Diagnosis.addBuff(BEukrasian_Diagnosis);
    //Eukrasian_Diagnosis.addBuff(BDifferential_Diagnosis);
    let Taurochole = new Skill("Taurochole","https://img.finalfantasyxiv.com/lds/d/fe3b0d2ce97deba2e6b4cfbc39e65e2abd32b31b.png");
    Taurochole.addBuff(BTaurochole);
    SGE.addSkill(Eukrasian_Prognosis);
    SGE.addSkill(Kerachole);
    SGE.addSkill(Holos);
    SGE.addSkill(Panhaima);
    SGE.addSkill(Haima);
    SGE.addSkill(Eukrasian_Diagnosis);
    SGE.addSkill(Taurochole);


    //Melee actions
    const BFeint = new Buff(0,0,10,5,0,10,90,1,true,false,"Feint","https://xivapi.com/i/013000/013904.png",false);
    let Feint = new Skill("Feint","https://img.finalfantasyxiv.com/lds/d/84c26a86cbbb8a599e5a2441cebcd33b0064bf07.png");
    Feint.addBuff(BFeint);

    //Setup NIN
    let NIN = new Job("NIN", "https://img.finalfantasyxiv.com/lds/promo/h/N/EXvdQYvr1Rn4En8AKssbVwwcac.png",75435,126,1504,3076,2.10);
    const BShade_Shift = new Buff(0,20,0,0,0,20,120,1,false,false,"Shade Shift","https://assets.rpglogs.com/img/ff/abilities/010000-010605.png",false);
    let Shade_Shift = new Skill("Shade Shift","https://img.finalfantasyxiv.com/lds/d/533a4a3e924aaf268ee89a9c58845941bb73bad1.png");
    Shade_Shift.addBuff(BShade_Shift);
    NIN.addSkill(Feint);
    NIN.addSkill(Shade_Shift);
    
    //Setup DRG
    let DRG = new Job("DRG", "https://img.finalfantasyxiv.com/lds/promo/h/1/zWRkXGJIJhN7WHGGv1gVscRxmA.png",76179,126,1545,3096,2.50);
    DRG.addSkill(Feint);
    
    //Setup SAM
    let SAM = new Job("SAM", "https://img.finalfantasyxiv.com/lds/promo/h/J/Ra2GV79gVQhy6SwCrU19boTghc.png",75513,126,1571,3083,2.15);
    const BThird_Eye = new Buff(0,0,10,10,0,4,15,1,false,false,"Third Eye","https://xivapi.com/i/013000/013307.png",false);
    let Third_Eye = new Skill("Third Eye","https://img.finalfantasyxiv.com/lds/d/3c97e963e92ae242000e51159d9eb749897d8a68.png");
    Third_Eye.addBuff(BThird_Eye);
    SAM.addSkill(Feint);
    SAM.addSkill(Third_Eye);

    //Setup MNK
    let MNK = new Job("MNK", "https://img.finalfantasyxiv.com/lds/promo/h/C/Ce_VQB6VPPJKTGJwxf3h5iujp4.png",75446,126,1546,3072,1.94);
    const BRiddle_of_Earth = new Buff(0,0,20,20,0,10,120,1,false,false,"Riddle of Earth","https://assets.rpglogs.com/img/ff/abilities/012000-012527.png",false);
    let Riddle_of_Earth = new Skill("Riddle of Earth","https://img.finalfantasyxiv.com/lds/d/84e3e679f5393f9a83e3b8204aad5192ecc483d1.png");
    Riddle_of_Earth.addBuff(BRiddle_of_Earth);
    MNK.addSkill(Feint);
    MNK.addSkill(Riddle_of_Earth);

    //Setup RPR
    let RPR = new Job("RPR", "https://img.finalfantasyxiv.com/lds/promo/h/p/y8GHAXX4qhY7D-yqnCqtEPkjoo.png",76131,126,1545,3093,2.49);
    const BCrest_of_Time_Borrowed = new Buff(0,0,10,10,0,5,30,1,false,false,"Crest of Time Borrowed","https://xivapi.com/i/012000/012934.png",false);
    let Arcane_Crest = new Skill("Arcane Crest","https://img.finalfantasyxiv.com/lds/d/9977fdbbf70443f9f31f4868cba97138fbec5460.png");
    Arcane_Crest.addBuff(BCrest_of_Time_Borrowed);
    RPR.addSkill(Feint);
    RPR.addSkill(Arcane_Crest);



    //Setup DNC
    let DNC = new Job("DNC", "https://img.finalfantasyxiv.com/lds/promo/h/0/ZzzbixB1HHW9FaxNXdfY7Y7lvw.png",75345,126,1721,3096,2.47);
    const BShield_Samba = new Buff(0,0,10,10,0,15,90,1,true,false,"Shield Samba","https://assets.rpglogs.com/img/ff/abilities/013000-013715.png",false);
    let Shield_Samba = new Skill("Shield Samba","https://img.finalfantasyxiv.com/lds/d/f9692ff39ee50c5901429aaca48c066b8952732a.png");
    Shield_Samba.addBuff(BShield_Samba);
    DNC.addSkill(Shield_Samba);

    //Setup BRD
    let BRD = new Job("BRD", "https://img.finalfantasyxiv.com/lds/promo/h/b/d7BM1x8OZRZU-9fTk-D7g1t2oc.png",75345,126,1721,3096,2.47);
    const BTroubadour = new Buff(0,0,10,10,0,15,90,1,true,false,"Troubadour","https://xivapi.com/i/012000/012615.png",false);
    let Troubadour = new Skill("Troubadour","https://img.finalfantasyxiv.com/lds/d/8afc3a84c2ec0f215d378e8ed011fd260d3cdc6b.png");
    Troubadour.addBuff(BTroubadour);
    BRD.addSkill(Troubadour);

    //Setup MCH
    let MCH = new Job("MCH", "https://img.finalfantasyxiv.com/lds/promo/h/2/oHLJxTt_OLDK_eQkRTBVNwwxeE.png",75345,126,1721,3093,2.47);
    const BTactician  = new Buff(0,0,10,10,0,15,90,1,true,false,"Tactician","https://assets.rpglogs.com/img/ff/abilities/013000-013021.png",false);
    let Tactician  = new Skill("Tactician","https://img.finalfantasyxiv.com/lds/d/eb334bf6f4cfd728e234e09c1cc1521c37d9d73e.png");
    Tactician.addBuff(BTactician);
    const BDismantled  = new Buff(0,0,10,10,0,10,120,1,true,false,"Dismantled","https://assets.rpglogs.com/img/ff/abilities/013000-013009.png",false);
    let Dismantled  = new Skill("Dismantled","https://img.finalfantasyxiv.com/lds/d/94eaa7aadfa4d857c00551af690f42bb5d7a4a94.png");
    Dismantled.addBuff(BDismantled);
    MCH.addSkill(Tactician);
    MCH.addSkill(Dismantled);



    //Magical Ranged actions
    const BAddle = new Buff(0,0,5,10,0,10,90,1,true,false,"Addle","https://xivapi.com/i/013000/013917.png",false);
    let Addle = new Skill("Addle","https://img.finalfantasyxiv.com/lds/d/b45e688d81b5607246600f904aac008364db0d1e.png");
    Addle.addBuff(BAddle);


    //Setup BLM
    let BLM = new Job("BLM", "https://img.finalfantasyxiv.com/lds/promo/h/A/7JuT00VSwaFqTfcTYUCUnGPFQE.png",68444,126,1287,3092,2.17);
    const BManaward = new Buff(0,30,0,0,0,20,120,1,false,false,"Manaward","https://xivapi.com/i/010000/010456.png",false);
    let Manaward = new Skill("Manaward","https://img.finalfantasyxiv.com/lds/d/75ed92265dc2dcc6fa1e0b8f22a01258799f222d.png");
    Manaward.addBuff(BManaward);
    BLM.addSkill(Addle);
    BLM.addSkill(Manaward);

    //Setup RDM
    let RDM = new Job("RDM", "https://img.finalfantasyxiv.com/lds/promo/h/C/NRnqJxzRtbDKR1ZHzxazWBBR2Y.png",68395,126,1548,3094,2.48);
    const BMagick_Barrier = new Buff(0,0,0,10,0,10,120,1,true,false,"Magick Barrier","https://assets.rpglogs.com/img/ff/abilities/013000-013408.png",false);
    let Magick_Barrier = new Skill("Magick Barrier","https://img.finalfantasyxiv.com/lds/d/76814235b2963003889ec3f3fc8c4857d82d3177.png");
    Magick_Barrier.addBuff(BMagick_Barrier);
    RDM.addSkill(Addle);
    RDM.addSkill(Magick_Barrier);

    //Setup SMN
    let SMN = new Job("SMN", "https://img.finalfantasyxiv.com/lds/promo/h/b/ZwJFxv3XnfqB5N6tKbgXKnj6BU.png",68395,126,1548,3095,2.48);
    const BRadiant_Aegis = new Buff(0,20,0,0,0,30,60,2,false,false,"Radiant Aegis","https://assets.rpglogs.com/img/ff/abilities/012000-012691.png",false);
    let Radiant_Aegis = new Skill("Radiant Aegis","https://img.finalfantasyxiv.com/lds/d/a116b861109158ee5db8e36cf922fae8f923e7d5.png");
    Radiant_Aegis.addBuff(BRadiant_Aegis);
    SMN.addSkill(Addle);
    SMN.addSkill(Radiant_Aegis);

    let jobList = new Set();
    jobList.add(PLD);
    jobList.add(WAR);
    jobList.add(DRK);
    jobList.add(GNB);
    jobList.add(WHM);
    jobList.add(AST);
    jobList.add(SCH);
    jobList.add(SGE);
    jobList.add(MNK);
    jobList.add(SAM);
    jobList.add(NIN);
    jobList.add(DRG);
    jobList.add(RPR);
    jobList.add(BRD);
    jobList.add(DNC);
    jobList.add(MCH);
    jobList.add(BLM);
    jobList.add(RDM);
    jobList.add(SMN);

    return jobList;

}