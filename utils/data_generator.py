import random

def generate_array(size, min_value, max_value):
    return [random.randint(min_value, max_value) for _ in range(size)]

def generate_graph(num_nodes, num_edges):
    graph = {i: [] for i in range(num_nodes)}
    for _ in range(num_edges):
        node1 = random.randint(0, num_nodes - 1)
        node2 = random.randint(0, num_nodes - 1)
        graph[node1].append(node2)
        graph[node2].append(node1)
    return graph