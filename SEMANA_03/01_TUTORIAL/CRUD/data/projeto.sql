BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "formacao" (
	"idformacao"	INTEGER,
	"curso"	TEXT,
	"anoinicio"	INTEGER,
	"anofim"	INTEGER,
	"descricao"	TEXT,
	"idpessoa"	INTEGER,
	PRIMARY KEY("idformacao"),
	FOREIGN KEY("idpessoa") REFERENCES "pessoa"("idpessoa")
);
CREATE TABLE IF NOT EXISTS "realizacoes" (
	"idrealizacao"	INTEGER,
	"nome"	TEXT,
	"ano"	INTEGER,
	"descricao"	TEXT,
	"idpessoa"	INTEGER,
	PRIMARY KEY("idrealizacao"),
	FOREIGN KEY("idpessoa") REFERENCES "pessoa"("idpessoa")
);
CREATE TABLE IF NOT EXISTS "experiencia" (
	"idexperiencia"	INTEGER,
	"empresa"	NUMERIC,
	"anoinicio"	INTEGER,
	"anofim"	INTEGER,
	"cargo"	TEXT,
	"descricao"	TEXT,
	"idpessoa"	INTEGER,
	PRIMARY KEY("idexperiencia"),
	FOREIGN KEY("idpessoa") REFERENCES "pessoa"("idpessoa")
);
CREATE TABLE IF NOT EXISTS "pessoa" (
	"idpessoa"	TEXT,
	"descricao"	NUMERIC,
	"cargo"	TEXT,
	"endereco"	TEXT,
	"telefone"	TEXT,
	"email"	TEXT,
	"habilidade"	TEXT,
	"personalidade"	TEXT,
	PRIMARY KEY("idpessoa")
);
INSERT INTO "formacao" ("idformacao","curso","anoinicio","anofim","descricao","idpessoa") VALUES (1,'Técnico em Informática',2019,2022,'Instituto Federal do Rio de Janeiro',1);
INSERT INTO "realizacoes" ("idrealizacao","nome","ano","descricao","idpessoa") VALUES (1,'My Truck',2023,'Desenvolvimento de uma solução gamificada para a empresa Unipar',1);
INSERT INTO "experiencia" ("idexperiencia","empresa","anoinicio","anofim","cargo","descricao","idpessoa") VALUES (1,'Byjus Future School',2022,2023,'Professora de programação','Ensino de programação para crianças e adolescentes usando a metodologia baseada em projetos',1);
INSERT INTO "pessoa" ("idpessoa","descricao","cargo","endereco","telefone","email","habilidade","personalidade") VALUES ('1','Kaylane Vasconcelos','Programadora','Rua M.M.D.C, 80, São Paulo','21 940028922','kaylane.linda@email.com','Liderança e produtividade','confiança');
COMMIT;
