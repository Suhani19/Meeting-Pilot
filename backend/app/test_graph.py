from app.agent.graph import build_graph


def main():
    graph = build_graph()

    result = graph.invoke({
        "user_request":
            "Prepare me for my next meeting"
    })

    print(result)


if __name__ == "__main__":
    main()