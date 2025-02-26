from bd import criar_banco, conectar, desconectar  


def criar_tabela():
    conn = conectar(dbname="coletaseletiva_pesagem")  # 🔥 Conectar ao banco recém-criado
    if conn:
        cursor = conn.cursor()
        try:
            create_table_query = """
            CREATE TABLE IF NOT EXISTS pesagem (
                id SERIAL PRIMARY KEY,
                peso_calculado FLOAT NOT NULL,
                data TIMESTAMP NOT NULL,
                prefixo VARCHAR(50) NOT NULL,
                motorista VARCHAR(100) NOT NULL,
                cooperativa VARCHAR(100) NOT NULL,
                tipo_veiculo VARCHAR(50) NOT NULL,
                volume_carga FLOAT NOT NULL
            );
            """
            cursor.execute(create_table_query)
            conn.commit()
            print("Tabela 'pesagem' criada com sucesso!")
        except Exception as e:
            print(f"Erro ao criar a tabela: {e}")
        finally:
            cursor.close()
            desconectar(conn)  


if __name__ == "__main__":
    print("Tentando criar o banco de dados e a tabela...")

    criar_banco()  # 🔥 Primeiro cria o banco de dados
    criar_tabela()  # 🔥 Depois conecta no banco correto e cria a tabela
