const topics = [
  {
    id:'arrays', name:'Arrays & Hashing', icon:'📦', color:'#E1F5EE', days:'1–4, 20, 24–28, 56, 61–62, 69–71, 85–86, 96–102',
    subpatterns:[
      { name:'Basic array manipulation', tag:'Easy warm-up', qs:[
        {n:'Two Sum',d:'E'},{n:'Best Time to Buy and Sell Stock',d:'E'},{n:'Majority Element',d:'E'},{n:'Move Zeroes',d:'E'},
        {n:'Squares of a Sorted Array',d:'E'},{n:'Merge Sorted Array',d:'E'},{n:'Remove Duplicates from Sorted Array',d:'E'},
        {n:'Remove Duplicates from Sorted Array II',d:'M'},{n:'Find All Numbers Disappeared in an Array',d:'E'},
        {n:'Third Maximum Number',d:'E'},{n:'Valid Mountain Array',d:'E'},{n:'Sort Array By Parity',d:'E'},
        {n:'Max Consecutive Ones',d:'E'},{n:'Build Array from Permutation',d:'E'},{n:'Shuffle the Array',d:'E'},
        {n:'Find Pivot Index',d:'E'},{n:'Running Sum of 1d Array',d:'E'},{n:'Remove Element',d:'E'},
        {n:'Max Consecutive Ones III',d:'M'},{n:'Non-decreasing Array',d:'M'}
      ]},
      { name:'Two pointers & sorting', tag:'Pattern', qs:[
        {n:'3Sum',d:'M'},{n:'3Sum Closest',d:'M'},{n:'Container With Most Water',d:'M'},
        {n:'Sort Colors',d:'M'},{n:'Rotate Array',d:'M'},{n:'Product of Array Except Self',d:'M'},
        {n:'Trapping Rain Water',d:'H'},{n:'Next Permutation',d:'M'},
        {n:'4Sum',d:'M',added:true},{n:'Two Sum II - Input Array Is Sorted',d:'M',added:true}
      ]},
      { name:'Prefix sum & range queries', tag:'Pattern', qs:[
        {n:'Range Sum Query Immutable',d:'E'},{n:'Contiguous Array',d:'M'},{n:'Subarray Sum Equals K',d:'M'},
        {n:'Continuous Subarray Sum',d:'M'},{n:'Number of Submatrices That Sum to Target',d:'H'},
        {n:'Matrix Block Sum',d:'M'},{n:'Minimum Size Subarray Sum',d:'M'}
      ]},
      { name:'Sliding window', tag:'Pattern', qs:[
        {n:'Longest Substring Without Repeating Characters',d:'M'},{n:'Maximum Points You Can Obtain from Cards',d:'M'},
        {n:'Shortest Subarray with Sum at Least K',d:'H'},{n:'Sliding Window Maximum',d:'H'},
        {n:'Subarrays with K Different Integers',d:'H'},{n:'Fruit Into Baskets',d:'M'},
        {n:'Minimum Window Substring',d:'H'},{n:'Permutation in String',d:'M'},
        {n:'Find All Anagrams in a String',d:'M'}
      ]},
      { name:'Interval problems', tag:'Pattern', qs:[
        {n:'Merge Intervals',d:'M'},{n:'Insert Interval',d:'M'},{n:'Non-overlapping Intervals',d:'M'},
        {n:'Interval List Intersections',d:'M'},{n:'Minimum Number of Arrows to Burst Balloons',d:'M'},
        {n:'Maximum Number of Events That Can Be Attended',d:'M'}
      ]},
      { name:'Hashing & frequency', tag:'Pattern', qs:[
        {n:'Design HashMap',d:'E'},{n:'Ransom Note',d:'E'},{n:'Contains Duplicate',d:'E'},
        {n:'Contains Duplicate II',d:'E'},{n:'Jewels and Stones',d:'E'},{n:'Unique Number of Occurrences',d:'E'},
        {n:'Word Pattern',d:'E'},{n:'Number of Good Pairs',d:'E'},{n:'Majority Element II',d:'M'},
        {n:'Longest Consecutive Sequence',d:'M'},{n:'Insert Delete GetRandom O(1)',d:'M'},
        {n:'Find All Duplicates in an Array',d:'M'},{n:'K-diff Pairs in an Array',d:'M'},
        {n:'Find and Replace Pattern',d:'M'},{n:'Group Anagrams',d:'M'},
        {n:'Custom Sort String',d:'M'},{n:'Intersection of Two Arrays',d:'E'},
        {n:'Intersection of Two Arrays II',d:'E'},{n:'Find Common Characters',d:'E'}
      ]},
      { name:'Matrix problems', tag:'Pattern', qs:[
        {n:'Valid Sudoku',d:'M'},{n:'Rotate Image',d:'M'},{n:'Set Matrix Zeroes',d:'M'},
        {n:'Game of Life',d:'M'},{n:'Diagonal Traverse',d:'M'},{n:'Battleships in a Board',d:'M'},
        {n:'Spiral Matrix',d:'M'},{n:'Spiral Matrix II',d:'M'},{n:'Search a 2D Matrix',d:'M'},
        {n:'Search a 2D Matrix II',d:'M'},{n:'Maximum Gap',d:'H'},{n:'First Missing Positive',d:'H'},
        {n:'Snapshot Array',d:'M'},{n:'Shuffle an Array',d:'M'},
        {n:'Count of Smaller Numbers After Self',d:'H'},{n:'Reverse Pairs',d:'H'}
      ]},
    ]
  },
  {
    id:'linkedlist', name:'Linked Lists', icon:'🔗', color:'#FAEEDA', days:'5–6, 31–34, 40, 100, 103',
    subpatterns:[
      { name:'Basic operations', tag:'Fundamentals', qs:[
        {n:'Reverse Linked List',d:'E'},{n:'Remove Linked List Elements',d:'E'},
        {n:'Remove Duplicates from Sorted List',d:'E'},{n:'Merge Two Sorted Lists',d:'E'},
        {n:'Middle of the Linked List',d:'E'},{n:'Palindrome Linked List',d:'E'},
        {n:'Intersection of Two Linked Lists',d:'E'},{n:'Linked List Cycle',d:'E'},
        {n:'Delete Node in a Linked List',d:'M'},{n:'Remove Duplicates from Sorted List II',d:'M'}
      ]},
      { name:'Two pointer / slow-fast', tag:'Pattern', qs:[
        {n:'Remove Nth Node From End of List',d:'M'},{n:'Next Greater Node In Linked List',d:'M'},
        {n:'Linked List Cycle II',d:'M',added:true},{n:'Happy Number',d:'E'}
      ]},
      { name:'Reversal & reordering', tag:'Pattern', qs:[
        {n:'Reverse Linked List II',d:'M'},{n:'Swap Nodes in Pairs',d:'M'},
        {n:'Reverse Nodes in k-Group',d:'H'},{n:'Odd Even Linked List',d:'M'},
        {n:'Partition List',d:'M'},{n:'Reorder List',d:'M'},
        {n:'Rotate List',d:'M'}
      ]},
      { name:'Multiple lists & merging', tag:'Pattern', qs:[
        {n:'Add Two Numbers',d:'M'},{n:'Add Two Numbers II',d:'M'},
        {n:'Copy List with Random Pointer',d:'M'},{n:'Sort List',d:'M'},
        {n:'Merge k Sorted Lists',d:'H'}
      ]},
      { name:'Advanced structures', tag:'Hard', qs:[
        {n:'LRU Cache',d:'M'},{n:'LFU Cache',d:'H'}
      ]}
    ]
  },
  {
    id:'trees', name:'Trees & BST', icon:'🌳', color:'#E1F5EE', days:'8–10, 46–54',
    subpatterns:[
      { name:'Tree traversals', tag:'Fundamentals', qs:[
        {n:'Binary Tree Preorder Traversal',d:'E'},{n:'Binary Tree Inorder Traversal',d:'E'},
        {n:'Binary Tree Postorder Traversal',d:'E'},{n:'Binary Tree Level Order Traversal',d:'M'},
        {n:'Binary Tree Zigzag Level Order Traversal',d:'M'},{n:'Binary Tree Right Side View',d:'M'},
        {n:'Maximum Width of Binary Tree',d:'M'},{n:'Maximum Level Sum of a Binary Tree',d:'M'}
      ]},
      { name:'Tree properties', tag:'Pattern', qs:[
        {n:'Maximum Depth of Binary Tree',d:'E'},{n:'Invert Binary Tree',d:'E'},
        {n:'Symmetric Tree',d:'E'},{n:'Balanced Binary Tree',d:'E'},{n:'Diameter of Binary Tree',d:'E'},
        {n:'Same Tree',d:'E'},{n:'Subtree of Another Tree',d:'E'},{n:'Merge Two Binary Trees',d:'E'},
        {n:'Cousins in Binary Tree',d:'E'},{n:'Count Complete Tree Nodes',d:'M'}
      ]},
      { name:'Path problems', tag:'Pattern', qs:[
        {n:'Path Sum',d:'E'},{n:'Binary Tree Paths',d:'E'},{n:'Path Sum II',d:'M'},
        {n:'Path Sum III',d:'M'},{n:'Binary Tree Maximum Path Sum',d:'H'},
        {n:'Sum Root to Leaf Numbers',d:'M'},{n:'Find Bottom Left Tree Value',d:'M'},
        {n:'Distribute Coins in Binary Tree',d:'M'},{n:'All Nodes Distance K in Binary Tree',d:'M'}
      ]},
      { name:'Tree construction & serialization', tag:'Pattern', qs:[
        {n:'Convert Sorted Array to Binary Search Tree',d:'E'},{n:'Construct Binary Tree from Preorder and Inorder Traversal',d:'M'},
        {n:'Flatten Binary Tree to Linked List',d:'M'},{n:'Populate Next Right Pointers in Each Node',d:'M'},
        {n:'Populate Next Right Pointers in Each Node II',d:'M'},
        {n:'Serialize and Deserialize Binary Tree',d:'H'},
        {n:'Step-By-Step Directions From a Binary Tree Node to Another',d:'M'}
      ]},
      { name:'BST operations', tag:'Pattern', qs:[
        {n:'Range Sum of BST',d:'E'},{n:'Delete Node in a BST',d:'M'},
        {n:'Validate Binary Search Tree',d:'M'},{n:'Kth Smallest Element in a BST',d:'M'},
        {n:'Lowest Common Ancestor of a BST',d:'M'},{n:'Lowest Common Ancestor of a Binary Tree',d:'M'},
        {n:'Convert Sorted List to Binary Search Tree',d:'M'},
        {n:'Construct BST from Preorder Traversal',d:'M'},{n:'Binary Search Tree Iterator',d:'M'},
        {n:'Recover Binary Search Tree',d:'H'},{n:'Trim a Binary Search Tree',d:'M'},
        {n:'Balance a Binary Search Tree',d:'M'},{n:'Unique Binary Search Trees',d:'M'},
        {n:'Unique Binary Search Trees II',d:'M'}
      ]}
    ]
  },
  {
    id:'graphs', name:'Graphs', icon:'🕸️', color:'#EEEDFE', days:'21, 63–68, 111, 113–114',
    subpatterns:[
      { name:'BFS', tag:'Pattern', qs:[
        {n:'Flood Fill',d:'E'},{n:'Island Perimeter',d:'E'},{n:'Find if Path Exists in Graph',d:'E'},
        {n:'Number of Islands',d:'M'},{n:'01 Matrix',d:'M'},{n:'Rotting Oranges',d:'M'},
        {n:'Clone Graph',d:'M'},{n:'Open the Lock',d:'M'},{n:'Shortest Bridge',d:'M'},
        {n:'Shortest Path in Binary Matrix',d:'M'},{n:'Pacific Atlantic Water Flow',d:'M'},
        {n:'Surrounded Regions',d:'M'},{n:'Max Area of Island',d:'M'},
        {n:'All Paths From Source to Target',d:'M'},{n:'Bus Routes',d:'H'},
        {n:'Word Ladder',d:'H'},{n:'Word Ladder II',d:'H'},
        {n:'Shortest Path in a Grid with Obstacles Elimination',d:'H'},
        {n:'Making A Large Island',d:'H'}
      ]},
      { name:'DFS & backtracking on graphs', tag:'Pattern', qs:[
        {n:'Number of Provinces',d:'M'},{n:'Accounts Merge',d:'M'},
        {n:'Word Search',d:'M'},{n:'Redundant Connection',d:'M'},
        {n:'Number of Operations to Make Network Connected',d:'M'},
        {n:'Evaluate Division',d:'M'},{n:'Critical Connections in a Network',d:'H'},
        {n:'Reconstruct Itinerary',d:'H'}
      ]},
      { name:'Topological sort', tag:'Pattern', qs:[
        {n:'Course Schedule',d:'M'},{n:'Course Schedule II',d:'M'},
        {n:'Longest Increasing Path in a Matrix',d:'H'},
        {n:'Alien Dictionary',d:'H',added:true},{n:'Sequence Reconstruction',d:'M',added:true}
      ]},
      { name:'Shortest path (Dijkstra / Bellman-Ford)', tag:'Pattern', qs:[
        {n:'Network Delay Time',d:'M'},{n:'Cheapest Flights Within K Stops',d:'M'},
        {n:'Minimum Height Trees',d:'M'},{n:'Swim in Rising Water',d:'H'},
        {n:'Path With Minimum Effort',d:'M',added:true},{n:'Find the City with Smallest Number of Neighbors',d:'M',added:true}
      ]},
      { name:'Union-Find', tag:'Pattern', qs:[
        {n:'Redundant Connection',d:'M'},{n:'Number of Islands (UF)',d:'M',added:true},
        {n:'Accounts Merge (UF)',d:'M',added:true},{n:'Number of Connected Components in an Undirected Graph',d:'M',added:true},
        {n:'Graph Valid Tree',d:'M',added:true}
      ]}
    ]
  },
  {
    id:'dp', name:'Dynamic Programming', icon:'🧠', color:'#FAECE7', days:'72–73, 76–81, 83–84, 123, 126, 129, 132',
    subpatterns:[
      { name:'1D DP — linear', tag:'Fundamentals', qs:[
        {n:'Fibonacci Number',d:'E'},{n:'Climbing Stairs',d:'E'},{n:'Min Cost Climbing Stairs',d:'E'},
        {n:'House Robber',d:'M'},{n:'House Robber II',d:'M'},{n:'Jump Game',d:'M'},
        {n:'Jump Game II',d:'M'},{n:'Jump Game III',d:'M'},{n:'Decode Ways',d:'M'},
        {n:'Perfect Squares',d:'M'},{n:'Delete and Earn',d:'M'},{n:'Minimum Cost For Tickets',d:'M'},
        {n:'Knight Dialer',d:'M'}
      ]},
      { name:'Coin change / unbounded knapsack', tag:'Pattern', qs:[
        {n:'Coin Change',d:'M'},{n:'Coin Change II',d:'M'},{n:'Combination Sum IV',d:'M'},
        {n:'Minimum Number of Taps to Open to Water a Garden',d:'H'}
      ]},
      { name:'0/1 Knapsack & subset', tag:'Pattern', qs:[
        {n:'Partition Equal Subset Sum',d:'M'},{n:'Target Sum',d:'M'},
        {n:'Partition to K Equal Sum Subsets',d:'M'},{n:'Last Stone Weight II',d:'M',added:true}
      ]},
      { name:'Longest subsequence (LIS / LCS)', tag:'Pattern', qs:[
        {n:'Longest Increasing Subsequence',d:'M'},{n:'Longest Common Subsequence',d:'M'},
        {n:'Delete Operation for Two Strings',d:'M'},{n:'Longest String Chain',d:'M'},
        {n:'Russian Doll Envelopes',d:'H'},{n:'Number of Matching Subsequences',d:'M'},
        {n:'Is Subsequence',d:'E'}
      ]},
      { name:'2D DP — grids & paths', tag:'Pattern', qs:[
        {n:'Unique Paths',d:'M'},{n:'Unique Paths II',d:'M'},{n:'Minimum Path Sum',d:'M'},
        {n:'Triangle',d:'M'},{n:'Maximal Square',d:'M'},{n:'Minimum Cost to Cut a Stick',d:'H'},
        {n:'Maximum Profit in Job Scheduling',d:'H'}
      ]},
      { name:'String DP', tag:'Pattern', qs:[
        {n:'Longest Palindromic Substring',d:'M'},{n:'Longest Palindromic Subsequence',d:'M'},
        {n:'Palindromic Substrings',d:'M'},{n:'Palindrome Partitioning',d:'M'},
        {n:'Palindrome Partitioning II',d:'H'},{n:'Minimum Insertion Steps to Make a String Palindrome',d:'H'},
        {n:'Edit Distance',d:'M'},{n:'Word Break',d:'M'},{n:'Word Break II',d:'H'},
        {n:'Regular Expression Matching',d:'H'},{n:'Wildcard Matching',d:'H'},
        {n:'Interleaving String',d:'H',added:true}
      ]},
      { name:'DP on trees & intervals', tag:'Advanced', qs:[
        {n:'House Robber III',d:'M'},{n:'Burst Balloons',d:'H'},{n:'Split Array Largest Sum',d:'H'},
        {n:'Largest Divisible Subset',d:'M'},{n:'Integer Break',d:'M'},{n:'Different Ways to Add Parentheses',d:'M'},
        {n:'Best Time to Buy and Sell Stock IV',d:'H'},{n:'Maximal Rectangle',d:'H'},
        {n:'Binary Tree Cameras',d:'H'},{n:'Maximum Product Subarray',d:'M'}
      ]},
      { name:'Classic DP problems', tag:'Must-know', qs:[
        {n:'Maximum Subarray',d:'M'},{n:'Pascal\'s Triangle',d:'E'},
        {n:'Best Time to Buy and Sell Stock II',d:'M'},{n:'Best Time to Buy and Sell Stock',d:'E'}
      ]}
    ]
  },
  {
    id:'strings', name:'Strings', icon:'📝', color:'#FBEAF0', days:'11–13, 41–43, 85, 107–109',
    subpatterns:[
      { name:'Palindrome', tag:'Pattern', qs:[
        {n:'Valid Palindrome',d:'E'},{n:'Valid Palindrome II',d:'M'},{n:'Longest Palindrome',d:'E'},
        {n:'Palindrome Number',d:'E'},{n:'Palindrome Pairs',d:'H'},{n:'Shortest Palindrome',d:'H'}
      ]},
      { name:'Anagram & pattern matching', tag:'Pattern', qs:[
        {n:'Valid Anagram',d:'E'},{n:'First Unique Character in a String',d:'E'},
        {n:'Isomorphic Strings',d:'E'},{n:'Find the Index of the First Occurrence in a String',d:'E'},
        {n:'String to Integer (atoi)',d:'M'},{n:'Zigzag Conversion',d:'M'},
        {n:'Count and Say',d:'M'},{n:'Encode and Decode TinyURL',d:'M'}
      ]},
      { name:'String manipulation', tag:'Basics', qs:[
        {n:'Reverse String',d:'E'},{n:'Reverse String II',d:'E'},{n:'Reverse Words in a String III',d:'E'},
        {n:'Reverse Words in a String',d:'M'},{n:'Reverse Only Letters',d:'E'},
        {n:'Reverse Vowels of a String',d:'E'},{n:'Length of Last Word',d:'E'},
        {n:'Add Strings',d:'E'},{n:'Fizz Buzz',d:'E'},{n:'Defanging an IP Address',d:'E'},
        {n:'Is Subsequence',d:'E'},{n:'Longest Common Prefix',d:'E'},
        {n:'String Compression',d:'M'},{n:'Remove All Adjacent Duplicates In String',d:'E'},
        {n:'Roman to Integer',d:'E'},{n:'Integer to Roman',d:'M'},
        {n:'Integer to English Words',d:'H'},{n:'Nth Digit',d:'M'},
        {n:'Text Justification',d:'H'},{n:'Multiply Strings',d:'M'}
      ]},
      { name:'Subsequence & window on strings', tag:'Pattern', qs:[
        {n:'Longest Substring with At Least K Repeating Characters',d:'M'},
        {n:'Longest Repeating Character Replacement',d:'M'},{n:'Minimum Window Substring',d:'H'},
        {n:'Longest Duplicate Substring',d:'H'},{n:'Number of Matching Subsequences',d:'M'}
      ]}
    ]
  },
  {
    id:'stack_queue', name:'Stack & Queue', icon:'📚', color:'#FAEEDA', days:'6, 35–40, 100, 106–107',
    subpatterns:[
      { name:'Basic stack', tag:'Fundamentals', qs:[
        {n:'Valid Parentheses',d:'E'},{n:'Min Stack',d:'M'},{n:'Implement Queue using Stacks',d:'E'},
        {n:'Backspace String Compare',d:'E'},{n:'Evaluate Reverse Polish Notation',d:'M'},
        {n:'Decode String',d:'M'},{n:'Simplify Path',d:'M'},{n:'Longest Absolute File Path',d:'M'}
      ]},
      { name:'Monotonic stack', tag:'Pattern', qs:[
        {n:'Next Greater Element I',d:'E'},{n:'Next Greater Element II',d:'M'},
        {n:'Next Greater Element III',d:'M'},{n:'Daily Temperatures',d:'M'},
        {n:'132 Pattern',d:'M'},{n:'Asteroid Collision',d:'M'},{n:'Remove K Digits',d:'M'},
        {n:'Remove Duplicate Letters',d:'M'},{n:'Largest Rectangle in Histogram',d:'H'},
        {n:'The Skyline Problem',d:'H'},{n:'Maximum Frequency Stack',d:'H'},
        {n:'Sliding Window Maximum',d:'H'}
      ]},
      { name:'Valid parentheses variants', tag:'Pattern', qs:[
        {n:'Minimum Remove to Make Valid Parentheses',d:'M'},
        {n:'Remove All Adjacent Duplicates in String II',d:'M'},
        {n:'Flatten Nested List Iterator',d:'M'},{n:'Longest Valid Parentheses',d:'H'},
        {n:'Basic Calculator',d:'H'},{n:'Basic Calculator II',d:'M'},{n:'Remove Invalid Parentheses',d:'H'}
      ]}
    ]
  },
  {
    id:'binary_search', name:'Binary Search', icon:'🔍', color:'#E6F1FB', days:'19, 55–58, 110, 116',
    subpatterns:[
      { name:'Classic binary search', tag:'Fundamentals', qs:[
        {n:'Binary Search',d:'E'},{n:'Search Insert Position',d:'E'},{n:'First Bad Version',d:'E'},
        {n:'Valid Perfect Square',d:'E'},{n:'Kth Missing Positive Number',d:'E'},
        {n:'Find First and Last Position of Element in Sorted Array',d:'M'},
        {n:'Find the Duplicate Number',d:'M'},{n:'Single Element in a Sorted Array',d:'M'},
        {n:'Median of Two Sorted Arrays',d:'H'}
      ]},
      { name:'Search in rotated array', tag:'Pattern', qs:[
        {n:'Search in Rotated Sorted Array',d:'M'},{n:'Search in Rotated Sorted Array II',d:'M'},
        {n:'Find Minimum in Rotated Sorted Array',d:'M'},{n:'Find Minimum in Rotated Sorted Array II',d:'H'},
        {n:'Peak Index in a Mountain Array',d:'M'},{n:'Find Peak Element',d:'M'}
      ]},
      { name:'Binary search on answer', tag:'Pattern', qs:[
        {n:'Capacity To Ship Packages Within D Days',d:'M'},{n:'Koko Eating Bananas',d:'M'},
        {n:'Minimum Size Subarray Sum',d:'M'},{n:'Time Based Key-Value Store',d:'M'},
        {n:'Split Array Largest Sum',d:'H'},{n:'Maximum Profit in Job Scheduling',d:'H'},
        {n:'Minimum Number of Days to Make m Bouquets',d:'M',added:true}
      ]},
      { name:'2D matrix search', tag:'Pattern', qs:[
        {n:'Search a 2D Matrix',d:'M'},{n:'Search a 2D Matrix II',d:'M'},
        {n:'Kth Smallest Element in a Sorted Matrix',d:'M'}
      ]}
    ]
  },
  {
    id:'heap_greedy', name:'Heap, Greedy & Trie', icon:'⛏️', color:'#E1F5EE', days:'87–88, 91–92, 96, 115',
    subpatterns:[
      { name:'Heap / priority queue', tag:'Pattern', qs:[
        {n:'Kth Largest Element in a Stream',d:'E'},{n:'K Closest Points to Origin',d:'M'},
        {n:'Top K Frequent Elements',d:'M'},{n:'Find K Closest Elements',d:'M'},
        {n:'Kth Largest Element in an Array',d:'M'},{n:'Kth Smallest Element in a Sorted Matrix',d:'M'},
        {n:'Top K Frequent Words',d:'M'},{n:'Reorganize String',d:'M'},
        {n:'Sort Characters By Frequency',d:'M'},{n:'Car Pooling',d:'M'},
        {n:'Find K Pairs with Smallest Sums',d:'M'},
        {n:'Task Scheduler',d:'M'},{n:'Maximum Number of Events That Can Be Attended',d:'M'},
        {n:'Merge k Sorted Lists',d:'H'},{n:'Find Median from Data Stream',d:'H'},
        {n:'Smallest Range Covering Elements from K Lists',d:'H'},
        {n:'Minimum Number of Refueling Stops',d:'H'}
      ]},
      { name:'Greedy', tag:'Pattern', qs:[
        {n:'Can Place Flowers',d:'E'},{n:'Maximum Units on a Truck',d:'E'},
        {n:'Gas Station',d:'M'},{n:'Partition Labels',d:'M'},{n:'Valid Parenthesis String',d:'M'},
        {n:'Wiggle Sort II',d:'M'},{n:'Max Chunks To Make Sorted',d:'M'},{n:'H-Index',d:'M'},
        {n:'Candy',d:'H'},{n:'Jump Game',d:'M'},{n:'Jump Game II',d:'M'},
        {n:'Largest Number',d:'M'},{n:'Pancake Sorting',d:'M'}
      ]},
      { name:'Trie', tag:'Pattern', qs:[
        {n:'Implement Trie (Prefix Tree)',d:'M'},{n:'Design Add and Search Words Data Structure',d:'M'},
        {n:'Search Suggestions System',d:'M'},{n:'Remove Sub-Folders from the Filesystem',d:'M'},
        {n:'Word Search II',d:'H'},{n:'Word Break',d:'M'},{n:'Palindrome Pairs',d:'H'},
        {n:'Maximum XOR of Two Numbers in an Array',d:'M'}
      ]}
    ]
  },
  {
    id:'backtracking', name:'Backtracking & Bit Manipulation', icon:'🎲', color:'#EEEDFE', days:'93–95, 98–99, 117–118',
    subpatterns:[
      { name:'Permutations & combinations', tag:'Pattern', qs:[
        {n:'Permutations',d:'M'},{n:'Permutations II',d:'M'},{n:'Subsets',d:'M'},{n:'Subsets II',d:'M'},
        {n:'Combinations',d:'M'},{n:'Letter Combinations of a Phone Number',d:'M'},
        {n:'Generate Parentheses',d:'M'},{n:'Next Permutation',d:'M'},{n:'Permutation Sequence',d:'H'}
      ]},
      { name:'Combination sum & target', tag:'Pattern', qs:[
        {n:'Combination Sum',d:'M'},{n:'Combination Sum III',d:'M'},{n:'Combination Sum IV',d:'M'},
        {n:'Restore IP Addresses',d:'M'},{n:'N-Queens',d:'H'},{n:'Sudoku Solver',d:'H'},
        {n:'Unique Paths III',d:'H'},{n:'K-th Symbol in Grammar',d:'M'},
        {n:'Remove Invalid Parentheses',d:'H'},{n:'Word Search',d:'M'}
      ]},
      { name:'Bit manipulation', tag:'Pattern', qs:[
        {n:'Add Binary',d:'E'},{n:'Counting Bits',d:'E'},{n:'Number of 1 Bits',d:'E'},
        {n:'Single Number',d:'E'},{n:'Missing Number',d:'E'},{n:'Reverse Bits',d:'E'},
        {n:'Hamming Distance',d:'E'},{n:'Single Number II',d:'M'},{n:'Single Number III',d:'M'},
        {n:'Maximum XOR of Two Numbers in an Array',d:'M'},{n:'Divide Two Integers',d:'M'},
        {n:'Sum of Two Integers',d:'M'},{n:'Bitwise AND of Numbers Range',d:'M'},{n:'Gray Code',d:'M'}
      ]},
      { name:'Math', tag:'Pattern', qs:[
        {n:'Power of Two',d:'E'},{n:'Happy Number',d:'E'},{n:'Palindrome Number',d:'E'},
        {n:'Count Primes',d:'M'},{n:'Excel Sheet Column Number',d:'E'},{n:'Add Digits',d:'E'},
        {n:'Maximum Product of Three Numbers',d:'E'},{n:'Count Odd Numbers in an Interval Range',d:'E'},
        {n:'Rectangle Overlap',d:'E'},{n:'Sqrt(x)',d:'E'},{n:'Plus One',d:'E'},
        {n:'Pow(x, n)',d:'M'},{n:'Reverse Integer',d:'M'},{n:'Random Pick with Weight',d:'M'},
        {n:'Robot Bounded In Circle',d:'M'},{n:'Angle Between Hands of a Clock',d:'M'},
        {n:'Max Points on a Line',d:'H'},{n:'K Closest Points to Origin',d:'M'},
        {n:'Fraction to Recurring Decimal',d:'M'},{n:'Minimum Area Rectangle',d:'M'}
      ]}
    ]
  }
];