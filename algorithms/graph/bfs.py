from collections import deque
from utils.visualization_helpers import visualize_graph

def bfs(graph, canvas, start, step_by_step=False):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        node = queue.popleft()
        visualize_graph(graph, canvas, visited)
        if step_by_step:
            input("Press Enter to continue...")
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited