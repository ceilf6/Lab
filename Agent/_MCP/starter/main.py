"""
FastMCP Demo Server

This is a demo server showcasing FastMCP capabilities including:
- Tools: Functions that can be called by MCP clients
- Resources: Data sources that can be accessed
- Prompts: Template prompts for common tasks
"""

from mcp.server.fastmcp import FastMCP
import json
from datetime import datetime
from typing import Optional

# Initialize FastMCP server
# Note: Using MCP SDK's FastMCP for compatibility with MCP CLI
mcp = FastMCP("FastMCP Demo Server")


# ==================== Tools ====================

@mcp.tool()
def greet(name: str, language: str = "en") -> str:
    """
    Generate a personalized greeting in different languages.
    
    Args:
        name: The name of the person to greet
        language: Language code (en, zh, es, fr). Defaults to "en"
    
    Returns:
        A personalized greeting message
    """
    greetings = {
        "en": f"Hello, {name}! Nice to meet you.",
        "zh": f"你好，{name}！很高兴认识你。",
        "es": f"¡Hola, {name}! Encantado de conocerte.",
        "fr": f"Bonjour, {name}! Ravi de vous rencontrer."
    }
    return greetings.get(language, greetings["en"])


@mcp.tool()
def calculate(expression: str) -> dict:
    """
    Safely evaluate a mathematical expression.
    
    Args:
        expression: A mathematical expression (e.g., "2 + 2", "10 * 5")
    
    Returns:
        A dictionary with the result and expression
    """
    try:
        # Only allow basic math operations for safety
        allowed_chars = set("0123456789+-*/.() ")
        if not all(c in allowed_chars for c in expression):
            return {
                "result": None,
                "error": "Expression contains invalid characters",
                "expression": expression
            }
        
        result = eval(expression)
        return {
            "result": result,
            "expression": expression,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "result": None,
            "error": str(e),
            "expression": expression
        }


@mcp.tool()
def get_weather(city: str, unit: str = "celsius") -> dict:
    """
    Get weather information for a city (mock data).
    
    Args:
        city: Name of the city
        unit: Temperature unit ("celsius" or "fahrenheit")
    
    Returns:
        Weather information dictionary
    """
    # Mock weather data
    mock_data = {
        "beijing": {"temp": 15, "condition": "sunny", "humidity": 45},
        "shanghai": {"temp": 18, "condition": "cloudy", "humidity": 60},
        "new york": {"temp": 10, "condition": "rainy", "humidity": 75},
        "london": {"temp": 8, "condition": "foggy", "humidity": 80},
    }
    
    city_lower = city.lower()
    weather = mock_data.get(city_lower, {"temp": 20, "condition": "unknown", "humidity": 50})
    
    temp = weather["temp"]
    if unit == "fahrenheit":
        temp = temp * 9/5 + 32
    
    return {
        "city": city,
        "temperature": round(temp, 1),
        "unit": unit,
        "condition": weather["condition"],
        "humidity": weather["humidity"],
        "timestamp": datetime.now().isoformat()
    }


# ==================== Resources ====================

@mcp.resource("file://config")
def get_config() -> str:
    """
    Get server configuration information.
    """
    config = {
        "server_name": "FastMCP Demo Server",
        "version": "0.1.0",
        "available_tools": ["greet", "calculate", "get_weather"],
        "available_resources": ["config", "server_info"],
        "uptime": "running"
    }
    return json.dumps(config, indent=2)


@mcp.resource("file://server_info")
def get_server_info() -> str:
    """
    Get server information and statistics.
    """
    info = {
        "server": "FastMCP Demo Server",
        "status": "active",
        "started_at": datetime.now().isoformat(),
        "features": [
            "Multiple language greetings",
            "Mathematical calculations",
            "Weather information (mock)",
            "Configuration access"
        ]
    }
    return json.dumps(info, indent=2)


# ==================== Prompts ====================

@mcp.prompt()
def greeting_template(name: str, occasion: str = "meeting") -> list[dict]:
    """
    Generate a greeting prompt template.
    
    Args:
        name: Name of the person
        occasion: Type of occasion (meeting, birthday, farewell)
    
    Returns:
        A list of prompt messages
    """
    templates = {
        "meeting": f"Create a warm greeting for {name} when meeting them for the first time.",
        "birthday": f"Write a birthday message for {name}.",
        "farewell": f"Create a farewell message for {name}."
    }
    
    prompt = templates.get(occasion, templates["meeting"])
    
    return [
        {
            "role": "user",
            "content": prompt
        }
    ]


@mcp.prompt()
def calculation_help() -> list[dict]:
    """
    Get help for using the calculator tool.
    """
    return [
        {
            "role": "user",
            "content": """I need help with calculations. Please explain:
1. How to use the calculate tool
2. What operations are supported
3. Examples of valid expressions"""
        }
    ]


# The `mcp` variable is automatically detected by MCP CLI when using `mcp run main.py`
# No need to export a separate server object - `mcp` is already the correct type

if __name__ == "__main__":
    # Run the MCP server using stdio transport (standard for MCP)
    mcp.run()
