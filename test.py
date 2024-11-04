# benchmark_heavy.py

from typing import List
import time

def calculate_squares(numbers: List[int]) -> int:
    total: int = 0
    for number in numbers:
        total += number * number
    return total

# Set up a large workload
large_numbers = list(range(1, 10**7))  # List from 1 to 10 million

# Measure the time taken for the computation
start = time.perf_counter()
result = calculate_squares(large_numbers)
end = time.perf_counter()

print(f"Result: {result}")
print(f"Execution time: {end - start:.6f} seconds")
