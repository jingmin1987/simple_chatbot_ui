"""
Simple unit test(s)
"""
import sys
sys.path.insert(0, '.')
from chatbot import find_missing_input


def test_find_missing_input():
    test_response = {
        'a': 1,
        'b': 2
    }

    needed_key = ['a', 'c', 'd']
    answer = find_missing_input(needed_key, test_response)

    assert isinstance(answer, list)
    assert set(answer) == {'c', 'd'}
