from utils.visualization_helpers import visualize_graph

def dfs(graph, canvas, start, step_by_step=False):
    visited = set()

    def _dfs(node):
        visited.add(node)
        visualize_graph(graph, canvas, visited)
        if step_by_step:
            input("Press Enter to continue...")
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                _dfs(neighbor)

    _dfs(start)
    return visited