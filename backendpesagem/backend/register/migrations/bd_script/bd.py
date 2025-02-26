import psycopg2
from psycopg2 import OperationalError


def conectar(dbname="coletaseletiva"):
    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user="postgres",
            password="luis27",
            host="localhost",
            port="5432"
        )
        print(f"Conectado ao banco '{dbname}' com sucesso!")
        return conn
    except OperationalError as e:
        print(f"Erro de conexão: {e}")
        return None


def desconectar(conn):
    try:
        if conn:
            conn.close()
            print("Conexão fechada com sucesso.")
    except Exception as e:
        print(f"Erro ao fechar a conexão: {e}")


def criar_banco():
    conn = psycopg2.connect(
        dbname="postgres",  # Conectar ao banco principal
        user="postgres",
        password="luis27",
        host="localhost",
        port="5432"
    )
    conn.autocommit = True  # 🔥 Permite rodar CREATE DATABASE fora de uma transação
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'coletaseletiva_pesagem'")
        if cursor.fetchone():
            print("O banco de dados 'coletaseletiva_pesagem' já existe.")
        else:
            print("Criando o banco de dados 'coletaseletiva_pesagem'...")
            cursor.execute("CREATE DATABASE coletaseletiva_pesagem ENCODING 'UTF8'")
            print("Banco de dados 'coletaseletiva_pesagem' criado com sucesso!")
    except Exception as e:
        print(f"Erro ao criar banco de dados: {e}")
    finally:
        cursor.close()
        conn.close()
