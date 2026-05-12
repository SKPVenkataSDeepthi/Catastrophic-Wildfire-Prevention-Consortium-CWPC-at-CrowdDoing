from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

def build_vector_store():

    # Read scraped website data
    with open("backend/data/cwpc_website.txt", "r") as f:
        text = f.read()

    # Split text into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_text(text)

    print(f"Created {len(chunks)} chunks.")

    # Load embedding model
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    # Create vector database
    vectorstore = Chroma.from_texts(
        texts=chunks,
        embedding=embeddings,
        persist_directory="backend/data/chroma_db"
    )

    vectorstore.persist()

    print("Vector database created successfully.")

def query_vector_store(question):

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    vectorstore = Chroma(
        persist_directory="backend/data/chroma_db",
        embedding_function=embeddings
    )

    results = vectorstore.similarity_search(question, k=3)

    return [doc.page_content for doc in results]

def query_vector_store(question):

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    vectorstore = Chroma(
        persist_directory="backend/data/chroma_db",
        embedding_function=embeddings
    )

    results = vectorstore.similarity_search(question, k=3)

    return [doc.page_content for doc in results]